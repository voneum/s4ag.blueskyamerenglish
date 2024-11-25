export class SkeetCounter {
    private _container: HTMLElement;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    public LeftCount: number = 0;
    public RightCount: number = 0;
    public LeftPercent: number = 0;
    public RightPercent: number = 0;

    private unionJack = new Image();
    private starsAndStripes = new Image();
    private _flagsLoaded = false;
    private _terms: string = ""; // Add a private variable to store the terms text

    constructor(container: HTMLElement, private _leftTitle: string, private _rightTitle: string) {
        this._container = container;
        
        this.unionJack.src = "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg";
        this.starsAndStripes.src = "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg";
        this.loadFlags();

        // Create and append canvas
        this._canvas = document.createElement('canvas');
        this._container.appendChild(this._canvas);

        // Get canvas context
        const context = this._canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to get 2D rendering context');
        }
        this._ctx = context;

        // Ensure canvas resizes dynamically with the container
        this._resizeCanvas();
        window.addEventListener('resize', () => this._resizeCanvas());
    }
    private loadFlags(){

        this.unionJack.onload = () => {

            this.starsAndStripes.onload = () => {
                this._flagsLoaded = true;
            };
        };
    }

    public AddLeftSkeets(count: number): void {
        this.LeftCount += count;
        this._updatePercents();
        this._redraw();
    }

    public AddRightSkeets(count: number): void {
        this.RightCount += count;
        this._updatePercents();
        this._redraw();
    }
    public ShowTerms(terms: string): void {
        this._terms = terms;
    }
    public ClearSkeets(): void {
        this.LeftCount = 0;
        this.RightCount = 0;
        this._updatePercents();
        this._redraw();
    }
    
    private _updatePercents(): void {
        const total = this.LeftCount + this.RightCount;
        if (total > 0) {
            this.LeftPercent = (this.LeftCount / total) * 100;
            this.RightPercent = (this.RightCount / total) * 100;
        } else {
            this.LeftPercent = 0;
            this.RightPercent = 0;
        }
    }

    private _resizeCanvas(): void {
        this._canvas.width = this._container.clientWidth;
        this._canvas.height = this._container.clientHeight;
        this._redraw();
    }

    private _redraw(): void {
        const ctx = this._ctx;
        const { width, height } = this._canvas;
    
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
    
        // Define layout properties
        const topPadding = 100;
        const bottomPadding = 40; // Doubled original padding
        const spacing = 10;
        const barWidth = (width - 2 * spacing - spacing) / 2;
        const maxBarHeight = height - topPadding - bottomPadding;
    
        // Calculate bar heights
        const leftBarHeight = (this.LeftPercent / 100) * maxBarHeight;
        const rightBarHeight = (this.RightPercent / 100) * maxBarHeight;
    
        // Define bar positions
        const leftBarX = spacing;
        const rightBarX = leftBarX + barWidth + spacing;
        const baseY = height - bottomPadding;
    
        // Draw flags and "VS"
        const flagHeight = 35;
        const flagWidth = 50;
        const flagY = 10;
        const vsY = flagY + flagHeight / 2 + 5;
    
        if (this._flagsLoaded){
            ctx.drawImage(this.starsAndStripes, rightBarX + barWidth - flagWidth, flagY, flagWidth, flagHeight);

            // ctx.save;
            // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Apply drop shadow
            // ctx.beginPath();
            // ctx.roundRect(leftBarX, flagY, flagWidth, flagHeight, 5); // Rounded corners
            //ctx.clip();
            ctx.drawImage(this.unionJack, leftBarX, flagY, flagWidth, flagHeight);
            // ctx.restore();
            // // Remove shadow after flags to avoid affecting other elements
            // ctx.shadowColor = 'transparent';
            
    
            // Draw "VS" between flags
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "24px Arial";
            ctx.fillText("VS", width / 2, vsY);
        }


        // Draw terms text below flags
        if (this._terms) {
            const termsY = flagY + flagHeight + 25;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "18px Arial";
            ctx.fillText(this._terms, width / 2, termsY);
        }

        // Draw left bar with rounded corners and gradient
        const leftGradient = ctx.createLinearGradient(leftBarX, 0, leftBarX + barWidth, 0);
        leftGradient.addColorStop(0, 'white');
        leftGradient.addColorStop(0.05, '#0000ff33');
        leftGradient.addColorStop(0.95, '#0000ff44');
        leftGradient.addColorStop(1, 'black');
    
        ctx.fillStyle = leftGradient;
        ctx.beginPath();
        ctx.roundRect(leftBarX, baseY - leftBarHeight, barWidth, leftBarHeight, 10);
        ctx.fill();
    
        // Draw right bar with rounded corners and gradient
        const rightGradient = ctx.createLinearGradient(rightBarX, 0, rightBarX + barWidth, 0);
        rightGradient.addColorStop(0, 'white');
        rightGradient.addColorStop(0.05, '#ff000033');
        rightGradient.addColorStop(0.95, '#ff000044');
        rightGradient.addColorStop(1, 'black');
    
        ctx.fillStyle = rightGradient;
        ctx.beginPath();
        ctx.roundRect(rightBarX, baseY - rightBarHeight, barWidth, rightBarHeight, 10);
        ctx.fill();
    
        // Draw counts and percentages above bars
        const totalPercent = (percent: number): string => `${percent.toFixed(1)}%`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.font = '16px Arial';
    
        ctx.fillText(`${this.LeftCount} (${totalPercent(this.LeftPercent)})`, leftBarX + barWidth / 2, baseY - leftBarHeight - 15);
        ctx.fillText(`${this.RightCount} (${totalPercent(this.RightPercent)})`, rightBarX + barWidth / 2, baseY - rightBarHeight - 15);
    
        // Draw titles below bars
        ctx.fillText(this._leftTitle, leftBarX + barWidth / 2, baseY + 15);
        ctx.fillText(this._rightTitle, rightBarX + barWidth / 2, baseY + 15);
    }
    
}
