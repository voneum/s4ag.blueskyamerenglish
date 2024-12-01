import { SVGs } from "./SVGs";

export class SkeetContainer {
    private _container: HTMLElement;
    private _skeets: string[] = [];
    private _addCount: number = 0;

    private _imgButterfly!: HTMLImageElement;

    constructor(container: HTMLElement) {
      this._container = container;
  
      // Style to ensure skeets wrap and the container adjusts properly
      this._container.style.overflow = "hidden";
      this._container.style.position = "relative";

      //this._createImgFromSvg(SVGs.BlueSkyButterfly, this._imgButterfly);
    }

    private _createImgFromSvg(svgText:string, img: HTMLImageElement):void {
        // Create a Blob from the SVG text
        const blob = new Blob([svgText], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);

        // Create an Image element to load the SVG
        img = new Image();
        img.onload = () => {
            // Clean up
            URL.revokeObjectURL(url);
        };
        img.onerror = () => {
            console.error("Failed to load SVG as an image.");
            URL.revokeObjectURL(url);
        };
        // Set the source of the image to the blob URL
        img.src = url;
    }
    /**
     * Adds a skeet to the container. Skeets are added at the top, and older skeets
     * are removed if they overflow the container.
     * @param skeet - The skeet text to add.
     * @param targetTexts - An array of target texts to highlight in the skeet string.
     */
    public AddSkeet(skeet: string, targetTexts: string[], url: string, media: string): void {
        this._addCount++;

        // Highlight each target text in the skeet string
        let highlightedSkeet = skeet;
        targetTexts.forEach(targetText => {
            const regex = new RegExp(targetText, "gi");
            highlightedSkeet = highlightedSkeet.replace(regex, (match) => {
                return `<span style="background-color: lightyellow;font-weight:bold;">${match}</span>`;
            });
        });

        // Add skeet to the array
        this._skeets.unshift(highlightedSkeet);
        //console.log("unshift", this._skeets.length);

        // Create a new div for the skeet
        const skeetDiv = this._createDivWithThreeChildren();

        const children = skeetDiv.children;
        if (children.length < 3) {
            console.error("The container does not have three child divs.");
            return;
        }

        const child1 = children[0] as HTMLElement;
        child1.innerHTML = SVGs.BlueSkyButterfly;
        child1.style.rotate = "-15deg";
        child1.style.translate = "-5px"; 
        child1.style.width = "3vw";
        child1.style.maxWidth = "28px";
        
        const child2 = children[1] as HTMLElement;
        child2.innerHTML = highlightedSkeet;

        const child3 = children[2] as HTMLElement;
        const childDiv = document.createElement("div");
        childDiv.style.width = "3vw";
        childDiv.style.maxWidth = "24px";
        childDiv.style.display = "flex";
        switch (media){
            case "RM":
            case "R":
                childDiv.title = "Skeet with remote content";
                childDiv.innerHTML = SVGs.BlueSkyRecord;
                child3.appendChild(childDiv);
                break;
            case "I":
                childDiv.title = "Skeet with image(s)";
                childDiv.innerHTML = SVGs.BlueSkyImg;
                child3.appendChild(childDiv);
              break;
            case "E":
                childDiv.title = "Skeet with external content";
                childDiv.innerHTML = SVGs.BlueSkyExternal;
                child3.appendChild(childDiv);
              break;
            case "V":
                childDiv.title = "Skeet with video";
                childDiv.innerHTML = SVGs.BlueSkyVid;
                child3.appendChild(childDiv);
              break;
            default:
              //console.log("📺", media);
          }

        // // Style the skeet div
        // skeetDiv.style.wordWrap = "break-word";
        // skeetDiv.style.overflow = "hidden";
        // skeetDiv.style.padding = "10px";
        // skeetDiv.style.margin = "3px 5px";
        // skeetDiv.style.boxSizing = "border-box";
        // //skeetDiv.style.border = "1px solid black";
        // skeetDiv.style.borderRadius = "8px";
        // skeetDiv.style.backgroundColor = this._addCount % 2 === 1 ? "#dddddd" : "#ffffff";
        // skeetDiv.style.color = "#333333"; // Ensure text is readable on light background
        // skeetDiv.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
        // skeetDiv.style.transition = "transform 0.5s ease";

        // // Add event listeners for click and hover effects
        // skeetDiv.style.cursor = "pointer"; // Change cursor to pointing hand
        skeetDiv.onclick = () => {
            window.open(url, "_blank"); // Open the URL in a new tab
        };

        // Animate the entry of the new skeet
        skeetDiv.style.position = "relative";
        skeetDiv.style.top = "-20px"; // Start above the container
        skeetDiv.style.opacity = "0"; // Start invisible

        // Insert the skeet at the top of the container
        this._container.insertBefore(skeetDiv, this._container.firstChild);

        // Trigger the animation to ease in from the top
        setTimeout(() => {
            skeetDiv.style.transition = "top 0.5s ease, opacity 0.5s ease";
            skeetDiv.style.top = "0"; // Move to the final position
            skeetDiv.style.opacity = "1"; // Make the div visible
        }, 10);
        
        // Adjust container to ensure skeets fit within its bounds
        this._trimOverflowingSkeets();
    }

  
    /**
     * Clears all skeets from the array and container.
     */
    public ClearSkeets(): void {
      this._skeets = [];
      this._container.innerHTML = ""; // Removes all child elements
    }
  
    /**
     * Trims skeets that overflow the height of the container.
     */
    private _trimOverflowingSkeets(): void {
        const containerHeight = this._container.clientHeight;
        let totalHeight = 0;

        // Collect all skeet divs
        const skeetDivs = Array.from(this._container.children) as HTMLElement[];

        let heightExceeded = false;
        // Iterate through skeet divs to calculate total height
        for (let i = 0; i < skeetDivs.length; i++) {
            if (heightExceeded) {
                this._skeets.pop(); // Remove from the array
                this._container.removeChild(skeetDivs[i]);
            } else {

                totalHeight += skeetDivs[i].offsetHeight;

                // Remove excess skeets if total height exceeds container height
                if (totalHeight > containerHeight) {
                    heightExceeded = true;
                }
            }
    //             // Fade out the last skeet before removing it
    //             skeetDivs[i].style.transition = "opacity 0.5s ease";
    //             skeetDivs[i].style.opacity = "0"; // Fade out
    //             this._skeets.pop(); // Remove from the array
    // //console.log("pop", this._skeets.length);
    //             // Remove the skeet after fade-out animation
    //             setTimeout((div) => {
    //                 try{
    //                     this._container.removeChild(div);
                        
    //                 } catch (e: any){
    //                     console.error(e.message);
    //                 } finally{
                        
    //                 }
    //             }, 500,skeetDivs[i]); // Wait for the fade-out to complete
    //             break;
    //         }

        }
    }

    /**
    * Creates a container div with three child divs laid out horizontally.
    * The middle div stretches to fill the maximum amount of space.
    * @returns The containing HTMLDivElement.
    */
    private _createDivWithThreeChildren(): HTMLDivElement {
       // Create the container div
       // Style the skeet div
       
       const skeetDiv = document.createElement("div");
       skeetDiv.style.display = "flex";
       //skeetDiv.style.width = "100%";
       skeetDiv.style.margin = "3px 5px";
       skeetDiv.style.boxSizing = "border-box";
       //skeetDiv.style.border = "1px solid black";
       skeetDiv.style.borderRadius = "8px";
       skeetDiv.style.backgroundColor = this._addCount % 2 === 1 ? "#ddddddaa" : "#ffffffaa";
       skeetDiv.style.color = "#333333"; // Ensure text is readable on light background
       skeetDiv.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
       skeetDiv.style.transition = "transform 0.5s ease";
       skeetDiv.style.maxHeight = "130px";
       skeetDiv.style.fontSize = "clamp(0.6rem, 2vw, 1rem)";
       // Add event listeners for click and hover effects
       skeetDiv.style.cursor = "pointer"; // Change cursor to pointing hand
       skeetDiv.onmouseover = function() 
       {
            skeetDiv.style.boxShadow = "2px 2px 5px rgba(0, 0, 128, 1.0)";
       };
       skeetDiv.onmouseout = function() 
       {
            skeetDiv.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
       };
   
       // Create the first child div
       const child1 = document.createElement("div");
       child1.style.flex = "0 0 10px"; // Fixed width of 100px
       child1.style.padding = "0 5px 0 0";
       child1.style.alignItems="center";
       child1.style.display = "flex";
   
   
       // Create the second (middle) child div
       const child2 = document.createElement("div");
       child2.style.flex = "1"; // Flexible width to fill available space
       //child2.style.backgroundColor = "blue";
       skeetDiv.style.wordWrap = "break-word";
       skeetDiv.style.overflow = "hidden";
       skeetDiv.style.padding = "10px";
   
       // Create the third child div
       const child3 = document.createElement("div");
       child3.style.flex = "0 0 10px"; // Fixed width of 100px
       //child3.style.backgroundColor = "green";
   
       // Append children to the container
       skeetDiv.appendChild(child1);
       skeetDiv.appendChild(child2);
       skeetDiv.appendChild(child3);
   
       return skeetDiv;
   }
   
   
  }
  