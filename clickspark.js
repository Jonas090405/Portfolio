// ClickSpark Effect - Only for non-touch devices
class ClickSpark {
    constructor(options = {}) {
        // Check if device has touch capability
        if (this.isTouchDevice()) {
            return;
        }

        this.sparkColor = options.sparkColor || '#fff';
        this.sparkSize = options.sparkSize || 12;
        this.sparkRadius = options.sparkRadius || 20;
        this.sparkCount = options.sparkCount || 7;
        this.duration = options.duration || 500;
        this.easing = options.easing || 'ease-out';
        this.extraScale = options.extraScale || 1.0;

        this.canvas = null;
        this.ctx = null;
        this.sparks = [];
        this.animationId = null;

        this.init();
    }

    isTouchDevice() {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            user-select: none;
        `;

        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        // Set canvas size
        this.resizeCanvas();

        // Event listeners
        window.addEventListener('resize', this.handleResize.bind(this));
        document.addEventListener('click', this.handleClick.bind(this));

        // Start animation loop
        this.startAnimation();
    }

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.scale(dpr, dpr);
    }

    handleResize() {
        this.resizeCanvas();
    }

    easeFunc(t) {
        switch (this.easing) {
            case 'linear':
                return t;
            case 'ease-in':
                return t * t;
            case 'ease-in-out':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            default: // 'ease-out'
                return t * (2 - t);
        }
    }

    handleClick(e) {
        const x = e.clientX;
        const y = e.clientY;
        const now = performance.now();

        // Create new sparks
        for (let i = 0; i < this.sparkCount; i++) {
            this.sparks.push({
                x,
                y,
                angle: (2 * Math.PI * i) / this.sparkCount,
                startTime: now
            });
        }
    }

    draw(timestamp) {
        const dpr = window.devicePixelRatio || 1;
        
        // Clear canvas properly with device pixel ratio
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();

        // Filter and draw sparks
        this.sparks = this.sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= this.duration) {
                return false;
            }

            const progress = elapsed / this.duration;
            const eased = this.easeFunc(progress);

            const distance = eased * this.sparkRadius * this.extraScale;
            const lineLength = this.sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            this.ctx.strokeStyle = this.sparkColor;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();

            return true;
        });
    }

    startAnimation() {
        const animate = (timestamp) => {
            this.draw(timestamp);
            this.animationId = requestAnimationFrame(animate);
        };
        this.animationId = requestAnimationFrame(animate);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.handleResize.bind(this));
        document.removeEventListener('click', this.handleClick.bind(this));
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    new ClickSpark({
        sparkColor: '#006999',
        sparkSize: 12,
        sparkRadius: 20,
        sparkCount: 7,
        duration: 500,
        easing: 'ease-out',
        extraScale: 1.0
    });
});
