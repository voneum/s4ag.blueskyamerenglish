import { For, onMount,createSignal } from 'solid-js';
import { Jetstream } from "./Jetstream";
import { BSkyApi_Record } from './BSkyApi_Record';

import styles from './BSky.module.css';
import { SkeetContainer } from './SkeetContainer';
import { SkeetCounter } from './SkeetCounter';
import { JetstreamDetail } from './JetstreamDetail';
import { Helpers } from './Helpers';
import { SVGs } from './SVGs';

export const BSky = () => {

  let elHtmlElementLeftSkeetContainer: HTMLElement;
  let elHtmlElementMiddleSkeetContainer: HTMLElement;
  let elHtmlElementRightSkeetContainer: HTMLElement;
  let skeetContainerLeft: SkeetContainer;
  let skeetContainerRight: SkeetContainer;
  let skeetCounter: SkeetCounter;
  let elHelpDialog: HTMLDialogElement;

  const [messageCount_GetterFn, messageCount_SetterFn] = createSignal<number>(0);
  const [dataReceived_GetterFn, dataReceived_SetterFn] = createSignal<number>(0);

  const [socketOpen_GetterFn, socketOpen_SetterFn] = createSignal<boolean>(false);


  //see https://blog.collinsdictionary.com/language-lovers/9-spelling-differences-between-british-and-american-english/
  const wordPairs: string[][] = [
    ["Colour", "Color"],
    ["Colours", "Colors"],
    ["Colouring", "Coloring"],
    ["Coloured", "Colored"],
    ["Colourful", "Colorful"],
    ["Colourless", "Colorless"],

    ["Honour", "Honor"],
    ["Honours", "Honors"],
    ["Honoured", "Honored"],
    ["Honourific", "Honorific"],
    ["Honourable", "Honorable"],

    ["Favour", "Favor"],
    ["Favours", "Favors"],
    ["Favoured", "Favored"],

    ["Labour", "Labor"],
    ["Labours", "Labors"],
    ["Laboured", "Labored"],
    ["Labouring", "Laboring"],

    ["Flavour", "Flavor"],
    ["Flavours", "Flavors"],
    ["Flavoured", "Flavored"],
    ["Flavoursome", "Flavorsome"],
    ["Flavourless", "Flavorless"],

    ["Neighbour", "Neighbor"],
    ["Neighbours", "Neighbors"],
    ["Neighbouring", "Neighboring"],
    ["Neighbourhood", "Neighborhood"],

    ["Burgle", "Burglarize"],
    ["Burgles", "Burglarizes"],
    ["Burgled", "Burglarized"],

    ["Theatre", "Theater"],
    ["Theatres", "Theaters"],

    ["Analyse", "Analyze"],
    ["Analysing", "Analyzing"],
    ["Analyses", "Analyzes"],
    ["Analysed", "Analyzed"],

    ["Realise", "Realize"],
    ["Realising", "Realizing"],
    ["Realises", "Realizes"],
    ["Realised", "Realized"],

    ["Centre", "Center"],
    ["Centres", "Centers"],
    ["Centred", "Centered"],

    ["Metre", "Meter"],
    ["Metres", "Meters"],
    ["Metred", "Metered"],

    ["Defence", "Defense"],
    ["Defences", "Defenses"],

    ["Licence", "License"],
    ["Licences", "Licenses"],
    ["Licenced", "Licensed"],
    ["Licencing", "Licensing"],

    ["Practise", "Practice"],
    ["Practising", "Practicing"],
    ["Practises", "Practices"],
    ["Practised", "Practiced"],

    ["Travelling", "Traveling"],
    ["Traveller", "Traveler"],
    ["Travellers", "Travelers"],

    ["Jewellery", "Jewelry"],

    ["Aluminium", "Aluminum"],

    ["Aeroplane", "Airplane"],
    ["Aeroplanes", "Airplanes"],

    ["Paedophile", "Pedophile"],
    ["Paedophiles", "Pedophiles"],

    ["analogue", "analog"],
    ["analogues", "analogs"],

    ["catalogue", "catalog"],
    ["catalogues", "catalogs"],
    ["catalogued", "cataloged"],

    ["dialogue", "dialog"],
    ["dialogues", "dialogs"],

    ["humour", "humor"],
    ["humours", "humors"],
    ["humoured", "humored"],
    ["humourless", "humorless"],

    ["leukaemia", "leukemia"],

    ["manoeuvre", "maneuver"],
    ["manoeuvres", "maneuvers"],
    ["manoeuvred", "maneuvered"],
    ["manoeuvring", "maneuvering"],

    ["oestrogen", "estrogen"],

    ["paediatric", "pediatric"],
    ["paediatrics", "pediatrics"],
    ["paediatrician", "pediatrician"],
    ["paediatricians", "pediatricians"],

    ["aesthetic", "esthetic"],
    ["aesthetics", "esthetics"],
    ["aesthestist", "esthestist"],

    ["anaesthesia", "anesthesia"],
    ["anaesthestist", "anesthestist"],
    ["anaesthestists", "anesthestists"],

    ["gynaecologists", "gynecologists"],
    ["gynaecologist", "gynecologist"],
    ["gynaecology", "gynecology"],
    ["gynaecological", "gynecological"],

    ["grey", "gray"],
    ["greys", "grays"],

    ["sceptic", "skeptic"],
    ["sceptics", "skeptics"],
    ["sceptical", "skeptical"],
  ];

  const wantedCollections = [
    "app.bsky.feed.post", 
    // "app.bsky.feed.like",
    // "app.bsky.feed.repost", //Represents repost events (similar to retweets on Twitter).
    // "app.bsky.feed.follow", //Represents follow actions (users following others).
    // "app.bsky.feed.block", //Represents block events (when users block others).
    // "app.bsky.feed.mute", //Represents mute events (when users mute others).
    // "app.bsky.feed.reply", //Represents reply events (responses to posts).
  ];

  const jetstream = new Jetstream({
    wantedCollections: wantedCollections
  });

  // Register listeners for a specific collection.
  jetstream.onCreate("app.bsky.feed.post", (event ) => {
    
    const eventDetail = event.detail as JetstreamDetail;

    messageCount_SetterFn(eventDetail.MessageCount);
    dataReceived_SetterFn(eventDetail.DataLength);

    const postResponse = eventDetail.PostResponse;
    const record = postResponse.Commit?.Record as BSkyApi_Record;
    let media = "";

    if (record.Embed){
      
      switch (record.Embed?.Type){
        case "app.bsky.embed.recordWithMedia":
          media = "RM";
          break;
        case "app.bsky.embed.record":
          media = "R";
          break;
        case "app.bsky.embed.images":
          media = "I";
          break;
        case "app.bsky.embed.external":
          media = "E";
          break;
        case "app.bsky.embed.video":
          media = "V";
          break;
        default:
          console.log("📺", record.Embed?.Type,record.Embed?.Video);
      }
    }
    let ukWords: string[] = [];
    let usWords: string[] = [];

    const lower = record.Text.toLowerCase();
    const words = Helpers.splitToAlphabeticWords(lower);
    for (let i = 0; i < wordPairs.length; i++) {
      const pair = wordPairs[i];      
      
      for (let j = 0; j < words.length; j++) {
        const word = words[j];            
        //if (word.indexOf(pair[0].toLowerCase()) === 0){
        if (word === pair[0].toLowerCase()){
          ukWords.push(pair[0]);
          break;
        //} else if (word.indexOf(pair[1].toLowerCase()) === 0){
        } else if (word === pair[1].toLowerCase()){
          usWords.push(pair[1]);
          break;
        }
      }
      words.forEach((word) => {    
      });
    }

    const butterfly = "<span style=\"font-size: 25px;float:left;filter: brightness(80%) sepia(100%) hue-rotate(170deg) saturate(500%);\">" + media + "🦋</span>" ;
    if (ukWords.length > 0){
      const postUrl = `https://bsky.app/profile/${postResponse.Did}/post/${postResponse.Commit?.RKey}`;   
      //https://bsky.app/profile/<DID>/post/<RKEY>
      skeetContainerLeft.AddSkeet(record.Text, ukWords, postUrl,media);
      skeetCounter.AddLeftSkeets(ukWords.length);

      const lastWord = ukWords[ukWords.length-1];
      const pair = wordPairs.find((s) => { return s[0] === lastWord});
      if (pair){
        skeetCounter.ShowTerms(`${pair[0].toLowerCase()} & ${pair[1].toLowerCase()}`);
      }
      
    }
    if (usWords.length > 0){
      const postUrl = `https://bsky.app/profile/${postResponse.Did}/post/${postResponse.Commit?.RKey}`;  
      skeetContainerRight.AddSkeet(record.Text, usWords, postUrl,media);
      skeetCounter.AddRightSkeets(usWords.length);

      
      const lastWord = usWords[usWords.length-1];
      const pair = wordPairs.find((s) => { return s[1] === lastWord});
      if (pair){
        skeetCounter.ShowTerms(`${pair[0].toLowerCase()} & ${pair[1].toLowerCase()}`);
      }
    }
  });

  // jetstream.onUpdate("app.bsky.feed.post", (event) => {
  //   console.log("Post updated:", event.detail);
  // });

  // jetstream.onDelete("app.bsky.feed.post", (event) => {
  //   console.log("Post deleted:", event.detail);
  // });

  onMount(() => {
    
    skeetContainerLeft = new SkeetContainer(elHtmlElementLeftSkeetContainer);
    skeetContainerRight = new SkeetContainer(elHtmlElementRightSkeetContainer);
    skeetCounter = new SkeetCounter(elHtmlElementMiddleSkeetContainer,"UK", "US");
    // Start listening to events.
    jetstream.onStart(() => {
      socketOpen_SetterFn(true);
    });
    jetstream.onClose(() => {
      socketOpen_SetterFn(false);
    });
    jetstream.start();

  })

  function startFeed(){
    jetstream.start();
  }
  function stopFeed(){
    jetstream.stop();
  }
  function clearFeed(){
    skeetContainerLeft.ClearSkeets();
    skeetContainerRight.ClearSkeets();
    skeetCounter.ClearSkeets();
    jetstream.clear();
    messageCount_SetterFn(0);
    dataReceived_SetterFn(0);
  }
  function displayHelp(){
    elHelpDialog.showModal();

  }
  
  return (
    <>
      <header class={styles.header} style="display:flex;">
        <div style="font-size:clamp(1rem, 2.5vw, 1.5rem);font-weight:bold;display:block; align-self: center;margin-left:5px;">
          Bluesky Amerenglish
        </div>
        <div style="flex-grow: 1;display:block; align-self: center; margin-left:10px;font-size:clamp(0.75rem, 2vw, 1.1rem);">
          What proportion of Bluesky is doing it wrong? 😉
        </div>
        <div style="margin-right:15px;display:block; align-self: center;display:flex;cursor:pointer;" onclick={displayHelp}>
          <div innerHTML={SVGs.BlueSkyHelp}></div>
          <a style="font-size:clamp(0.6rem, 2vw, 1rem);">What's this?</a>
        </div>
        <div style="margin-right:5px;font-size:clamp(0.75rem, 2vw, 1.1rem);display:block; align-self: center; text-align: end;white-space: nowrap;">
          <div><span>New posts:</span> <span style="font-weight:bold;">{messageCount_GetterFn()}</span></div>
          <div><span>Data received:</span> <span style="font-weight:bold;">{(dataReceived_GetterFn()/1000000).toFixed(1)}MB</span></div>
        </div>
        
      </header>
      <main class={styles.main}>
        <section ref={(el) => { elHtmlElementLeftSkeetContainer = el}} id="bodyLeft" class={styles.bodyLeft}></section>
        <section ref={(el) => { elHtmlElementMiddleSkeetContainer = el}} id="bodyMiddle" class={styles.bodyMiddle}></section>
        <section ref={(el) => { elHtmlElementRightSkeetContainer = el}} id="bodyRight" class={styles.bodyRight}></section>
      </main>
      <footer class={styles.footer} style="display:flex;">
        <div style="margin:auto;">
          <button onclick={startFeed} disabled={socketOpen_GetterFn()} style="padding:5px;font-size:20px;">Start</button>
          <button onclick={stopFeed} disabled={!socketOpen_GetterFn()} style="padding:5px;font-size:20px;">Stop</button>
          <button onclick={clearFeed} style="padding:5px;font-size:20px;">Clear</button>
        </div>
      </footer>

      <dialog ref={(el) => { elHelpDialog = el}}>
        
          <div style="margin:10px">
            <h1 style="margin: auto;display: table;">Bluesky Amerenglish</h1>

            <h2>The short story</h2>

            <div>This tool gives an insight into the version of English (US or UK) Bluesky posters are using.</div>

            <div>This was a weekend project I (<a href="https://bsky.app/profile/stu.pocknee.com" target="_blank">@stu.pocknee.com</a>) undertook to try out the <a href="https://docs.bsky.app/docs/advanced-guides/firehose" target="_blank">BlueSky Firehose</a> API.</div>
            
            <div>It was inspired by (potentially NSFW) efforts such as:</div>

            <ul style="columns: 3;-webkit-columns: 3;-moz-columns: 3;margin:10px 20px;">
              <li><a href="https://jakebailey.dev/bsky-digital-rain/" target="_blank">ATmospheric Digital Rain</a></li>            
              <li><a href="https://www.bewitched.com/demo/rainbowsky/" target="_blank">RainbowSky</a></li>
              <li><a href="https://www.emojirain.lol/" target="_blank">EmojiRain</a></li>
              <li><a href="https://www.intothebluesky.lol/" target="_blank">Into the Bluesky</a></li>
              <li><a href="https://flo-bit.dev/bluesky-visualizers/" target="_blank">Bluesky Visualizers</a></li>
              <li><a href="https://firehose3d.theo.io/" target="_blank">Firehose 3D</a></li>
              <li><a href="https://swearsky.bagpuss.org/" target="_blank">SwearSky</a> (NSFW)</li>
              <li><a href="https://javier.computer/bluesky/iam" target="_blank">I am...</a></li>
              <li><a href="https://firesky.tv/" target="_blank">Firesky</a></li>
              <li><a href="https://lantto.github.io/bluesky-mosaic/" target="_blank">Bluesky Mosaic</a> (NSFW)</li>
              <li><a href="https://bluesky.toddle.site/signups" target="_blank">Bluesky Signups</a></li>
            </ul>
            
            <div>Bluesky posts are ingested in real-time and compared against a catalog(ue) of word tuplets with both UK and US spellings.</div>

            <div>There is no claim that my self-compiled word list is complete. My comparison method is quick, dirty, and periodically wrong. 🤦‍♂️</div>

            <div>If you want to play with the code, clone it on <a href="https://github.com/voneum/s4ag.blueskyamerenglish" target="_blank">GitHub</a>.</div>

            <div>Feel free to submit patches!</div>

            <h2>The long(er) story</h2>

            <div>If the above is not enough, there will be an expanded version at <a href="https://www.pocknee.com/dsc" target="_blank">my blog</a></div>         

            <div>(Beware. Despite being Australian, <a href="https://www.pocknee.com/dsc/articles/why-i-write-american" target="_blank">I almost always write 'Merican</a> 🤷)</div>

          </div>

          <div style="display:grid;justify-content:center;">
            <form method="dialog">
              <button style="padding: 5px;
                  display: inline;
                  font-size: larger;
                  text-align: center;
                  background-color: #d3d3d3;
                  box-shadow: 2px 2px 2px gray;
                  cursor: pointer;
              }">OK</button>
            </form>
          </div>
        
      </dialog>
    </>
  );
};
