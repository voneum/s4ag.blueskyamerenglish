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
  let elRotatingTextSpan: HTMLSpanElement
  let rotatingTextIsWrong = false;

  const [messageCount_GetterFn, messageCount_SetterFn] = createSignal<number>(0);
  const [dataReceived_GetterFn, dataReceived_SetterFn] = createSignal<number>(0);

  const [socketOpen_GetterFn, socketOpen_SetterFn] = createSignal<boolean>(false);


  //for example: see https://blog.collinsdictionary.com/language-lovers/9-spelling-differences-between-british-and-american-english/
  const wordPairs: string[][] = [
    ["aeon","eon"],
    ["aeons","eons"],
    ["aeroplane","airplane"],
    ["aeroplanes","airplanes"],
    ["aesthestist","esthestist"],
    ["aesthestists","esthestists"],
    ["aesthetic","esthetic"],
    ["aesthetically","esthetically"],
    ["aesthetics","esthetics"],
    ["aluminium","aluminum"],
    ["anaemia","anemia"],
    ["anaemias","anemias"],
    ["anaemic","anemic"],
    ["anaemically","anemically"],
    ["anaesthesia","anesthesia"],
    ["anaesthesias","anesthesias"],
    ["anaesthestist","anesthestist"],
    ["anaesthestists","anesthestists"],
    ["anaesthetist","anesthetist"],
    ["anaesthetists","anesthetists"],
    ["anaesthetized","anesthetized"],
    ["anaesthetizing","anesthetizing"],
    ["analogue","analog"],
    ["analogues","analogs"],
    ["analyse","analyze"],
    ["analysed","analyzed"],
    ["analyses","analyzes"],
    ["analysing","analyzing"],
    ["annexe","annex"],
    ["antidiarrhoeal","antidiarrheal"],
    ["appal","appall"],
    ["arbour","arbor"],
    ["arbours","arbors"],
    ["arbourist","arborist"],
    ["arbourists","arborists"],
    ["arbourization","arborization"],
    ["arbourize","arborize"],
    ["arbourous","arborous"],
    ["ardour","ardor"],
    ["ardourless","ardorless"],
    ["armour","armor"],
    ["armoured","armored"],
    ["armourer","armorer"],
    ["armourers","armorers"],
    ["armouring","armoring"],
    ["barometre","barometer"],
    ["behaviour","behavior"],
    ["behaviours","behaviors"],
    ["behavioural","behavioral"],
    ["behaviourally","behaviorally"],
    ["behaviourism","behaviorism"],
    ["behaviourist","behaviorist"],
    ["burgle","burglarize"],
    ["burgled","burglarized"],
    ["burgles","burglarizes"],
    ["calibre","caliber"],
    ["calibres","calibers"],
    ["candour","candor"],
    ["candourless","candorless"],
    ["candourous","candorous"],
    ["carburetted","carbureted"],
    ["carburetting","carbureting"],
    ["carburettor","carburetor"],
    ["carburettors","carburetors"],
    ["catalogue","catalog"],
    ["catalogued","cataloged"],
    ["catalogues","catalogs"],
    ["centilitre","centiliter"],
    ["centilitres","centiliters"],
    ["centimetre","centimeter"],
    ["centimetres","centimeters"],
    ["centre","center"],
    ["centred","centered"],
    ["centres","centers"],
    ["centring","centering"],
    ["clamour","clamor"],
    ["clamoured","clamored"],
    ["clamouring","clamoring"],
    ["clamourous","clamorous"],
    ["clamourously","clamorously"],
    ["clamourousness","clamorousness"],
    ["colour","color"],
    ["colouration","coloration"],
    ["coloured","colored"],
    ["colourful","colorful"],
    ["colourfully","colorfully"],
    ["colouring","coloring"],
    ["colourizer","colorizer"],
    ["colourless","colorless"],
    ["colours","colors"],
    ["counseled","counselled"],
    ["counseling","counselling"],
    ["counsellor","counselor"],
    ["counsellors","counselors"],
    ["countermanoeuvre","countermaneuver"],
    ["countermanoeuvred","countermaneuvered"],
    ["decentre","decenter"],
    ["decentred","decentered"],
    ["defence","defense"],
    ["defences","defenses"],
    ["demeanour","demeanor"],
    ["dialogue","dialog"],
    ["dialogues","dialogs"],
    ["diarrhoea","diarrhea"],
    ["diarrhoeal","diarrheal"],
    ["diarrhoeic","diarrheic"],
    ["dishevelled","disheveled"],
    ["dishevelledness","disheveledness"],
    ["dishevelling","disheveling"],
    ["dishonour","dishonor"],
    ["dishonoured","dishonored"],
    ["dishonouring","dishonoring"],
    ["distil","distill"],
    ["distils","distills"],
    ["endeavour","endeavor"],
    ["endeavoured","endeavored"],
    ["endeavouring","endeavoring"],
    ["endeavourless","endeavorless"],
    ["enrol","enroll"],
    ["enrollments","enrolments"],
    ["enrolment","enrollment"],
    ["favour","favor"],
    ["favourable","favorable"],
    ["favourably","favorably"],
    ["favoured","favored"],
    ["favouring","favoring"],
    ["favours","favors"],
    ["fibre","fiber"],
    ["fibreglass","fiberglass"],
    ["flavour","flavor"],
    ["flavoured","flavored"],
    ["flavourful","flavorful"],
    ["flavouring","flavoring"],
    ["flavourless","flavorless"],
    ["flavours","flavors"],
    ["flavoursome","flavorsome"],
    ["fulfil","fulfill"],
    ["fulfilment","fulfillment"],
    ["gigatonne","gigaton"],
    ["glycerine","glycerin"],
    ["glycerines","glycerins"],
    ["gonorrhoea","gonorrhea"],
    ["gonorrhoeal","gonorrheal"],
    ["gonorrhoeic","gonorrheic"],
    ["gramme","gram"],
    ["grammes","grams"],
    ["grey","gray"],
    ["greys","grays"],
    ["grille","grill"],
    ["grilles","grills"],
    ["gynaecological","gynecological"],
    ["gynaecologically","gynecologically"],
    ["gynaecologist","gynecologist"],
    ["gynaecologists","gynecologists"],
    ["gynaecology","gynecology"],
    ["harbour","harbor"],
    ["harbourage","harborage"],
    ["harboured","harbored"],
    ["harbourer","harborer"],
    ["harbouring","harboring"],
    ["harbourless","harborless"],
    ["honour","honor"],
    ["honourable","honorable"],
    ["honourably","honorably"],
    ["honoured","honored"],
    ["honourific","honorific"],
    ["honouring","honoring"],
    ["honours","honors"],
    ["humour","humor"],
    ["humoured","humored"],
    ["humourist","humorist"],
    ["humourless","humorless"],
    ["humourous","humorous"],
    ["humourously","humorously"],
    ["humours","humors"],
    ["installments","instalments"],
    ["instalment","installment"],
    ["instalments","installments"],
    ["instil","instill"],
    ["jewellery","jewelry"],
    ["kilogramme","kilogram"],
    ["kilometre","kilometer"],
    ["kilotonne","kiloton"],
    ["labour","labor"],
    ["laboured","labored"],
    ["labourer","laborer"],
    ["labouring","laboring"],
    ["labourious","laborious"],
    ["labouriously","laboriously"],
    ["labours","labors"],
    ["leukaemia","leukemia"],
    ["licence","license"],
    ["licenced","licensed"],
    ["licences","licenses"],
    ["licencing","licensing"],
    ["litre","liter"],
    ["lustre","luster"],
    ["lustreless","lusterless"],
    ["manoeuvrability","maneuverability"],
    ["manoeuvrable","maneuverable"],
    ["manoeuvre","maneuver"],
    ["manoeuvred","maneuvered"],
    ["manoeuvres","maneuvers"],
    ["manoeuvring","maneuvering"],
    ["meagre","meager"],
    ["meagrely","meagerly"],
    ["meagreness","meagerness"],
    ["megatonne","megaton"],
    ["metre","meter"],
    ["metred","metered"],
    ["metres","meters"],
    ["metring","metering"],
    ["milligramme","milligram"],
    ["milligrammes","milligrams"],
    ["millilitre","milliliter"],
    ["millilitres","milliliters"],
    ["millimetre","millimeter"],
    ["millimetres","millimeters"],
    ["misbehaviour","misbehavior"],
    ["multiflavour","multiflavor"],
    ["neighbour","neighbor"],
    ["neighbourhood","neighborhood"],
    ["neighbouring","neighboring"],
    ["neighbourliness","neighborliness"],
    ["neighbourly","neighborly"],
    ["neighbours","neighbors"],
    ["odour","odor"],
    ["odours","odors"],
    ["odourless","odorless"],
    ["odourous","odorous"],
    ["oestrogen","estrogen"],
    ["offence","offense"],
    ["offences","offenses"],
    ["paediatric","pediatric"],
    ["paediatrician","pediatrician"],
    ["paediatricians","pediatricians"],
    ["paediatrics","pediatrics"],
    ["paedophile","pedophile"],
    ["paedophiles","pedophiles"],
    ["parlour","parlor"],
    ["parlours","parlors"],
    ["parlourlike","parlorlike"],
    ["parlourous","parlorous"],
    ["practise","practice"],
    ["practised","practiced"],
    ["practises","practices"],
    ["practising","practicing"],
    ["prebehavioural","prebehavioral"],
    ["pretence","pretense"],
    ["pretences","pretenses"],
    ["programme","program"],
    ["programmes","programs"],
    ["rancour","rancor"],
    ["rancourous","rancorous"],
    ["rancourously","rancorously"],
    ["realise","realize"],
    ["realised","realized"],
    ["realises","realizes"],
    ["realising","realizing"],
    ["recentre","recenter"],
    ["recentred","recentered"],
    ["recentring","recentering"],
    ["recolour","recolor"],
    ["reheatre","reheater"],
    ["reprogramme","reprogram"],
    ["resplendour","resplendor"],
    ["rigour","rigor"],
    ["rigours","rigors"],
    ["rigourous","rigorous"],
    ["rigourously","rigorously"],
    ["rigourousness","rigorousness"],
    ["rumour","rumor"],
    ["rumours","rumors"],
    ["rumoured","rumored"],
    ["rumouring","rumoring"],
    ["rumourless","rumorless"],
    ["rumourmonger","rumormonger"],
    ["rumourmongers","rumormongers"],
    ["sabre","saber"],
    ["sabres","sabers"],
    ["sabred","sabered"],
    ["sabreman","saberman"],
    ["sabresmith","sabersmith"],
    ["sabring","sabering"],
    ["saviour","savior"],
    ["saviours","saviors"],
    ["saviourhood","saviorhood"],
    ["saviourless","saviorless"],
    ["saviourlike","saviorlike"],
    ["savour","savor"],
    ["savours","savors"],
    ["savoured","savored"],
    ["savouring","savoring"],
    ["savourless","savorless"],
    ["savoury","savory"],
    ["sceptic","skeptic"],
    ["sceptical","skeptical"],
    ["sceptics","skeptics"],
    ["sceptre","scepter"],
    ["sceptres","scepters"],
    ["sceptred","sceptered"],
    ["sepulchre","sepulcher"],
    ["sepulchring","sepulchering"],
    ["skilful","skillful"],
    ["skilfully","skillfully"],
    ["skilfulness","skillfulness"],
    ["sombre","somber"],
    ["sombrely","somberly"],
    ["sombreness","somberness"],
    ["splendour","splendor"],
    ["splendours","splendors"],
    ["theatre","theater"],
    ["theatres","theaters"],
    ["tonne","ton"],
    ["tonnes","tons"],
    ["traveller","traveler"],
    ["travellers","travelers"],
    ["travelling","traveling"],
    ["tumour","tumor"],
    ["tumours","tumors"],
    ["tumourous","tumorous"],
    ["unfavourable","unfavorable"],
    ["unfavourably","unfavorably"],
    ["unsceptred","unsceptered"],
    ["valour","valor"],
    ["valourous","valorous"],
    ["valourously","valorously"],
    ["vigour","vigor"],
    ["vigourous","vigorous"],
    ["vigourously","vigorously"],
    ["vigourousness","vigorousness"],
    ["woollen","woolen"],
    ["woollens","woolens"],
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

  function animateText() {
    // Add the rotation class
    elRotatingTextSpan.classList.add(styles.rwrotate);
    
    // Change the text after .5 seconds (1.5 rotations)
    setTimeout(() => {
      elRotatingTextSpan.textContent = rotatingTextIsWrong ? 'right?😉' : 'wrong?😬';
      rotatingTextIsWrong = !rotatingTextIsWrong;
    }, 500);
  
    // Remove the rotation class after animation ends (6 seconds)
    setTimeout(() => {
      elRotatingTextSpan.classList.remove(styles.rwrotate);
    }, 1000);
  }
  function startPeriodicAnimation() {
    animateText(); // Initial animation
    setInterval(() => {
      animateText();
    }, 31000); // 1s animation + 30s rest period
  }
  
  // jetstream.onUpdate("app.bsky.feed.post", (event) => {
  //   console.log("Post updated:", event.detail);
  // });

  // jetstream.onDelete("app.bsky.feed.post", (event) => {
  //   console.log("Post deleted:", event.detail);
  // });

  onMount(() => {
    setTimeout(() => {
      startPeriodicAnimation();
    }, 15000);
    

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
          What proportion of Bluesky is doing it <span ref={(el) => { elRotatingTextSpan = el}} style="white-space: nowrap;">right?😉</span>
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
        <div style="position: absolute; right:5px;bottom:5px;">
          <a href="https://github.com/voneum/s4ag.blueskyamerenglish" target="_blank" innerHTML={SVGs.GithubLogo} title='GitHub'></a>
        </div>
      </footer>

      <dialog ref={(el) => { elHelpDialog = el}}>
        
          <div style="margin:10px">
            <h1 style="margin: auto;display: table;">Bluesky Amerenglish</h1>

            <h2>The short story</h2>

            <div>This tool gives insights into the version of English (US or UK) Bluesky posters are using.</div>

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

            <div>If you want to play with the code, find it on <a href="https://github.com/voneum/s4ag.blueskyamerenglish" target="_blank">GitHub</a>.</div>

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
