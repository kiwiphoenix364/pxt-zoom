enum Mode {
    //% block="Center"
    Center,
    //% block="Top-Left"
    TopLeft,
    //% block="Top"
    Top,
    //% block="Top-Right"
    TopRight,
    //% block="Left"
    Left,
    //% block="Right"
    Right,
    //% block="Bottom-Left"
    BottomLeft,
    //% block="Bottom"
    Bottom,
    //% block="Bottom-Right"
    BottomRight
}
//% color="#3fcbf4"
//% groups='["Normal", "Experimental"]'
namespace Zoom {
    let zoomLayer: Zoomable
    class Zoomable {
        protected y1 = 0
        protected x1 = 0
        protected memsize1 = 0
        protected size1 = 1
        protected zLayer1 = 1
        protected sw = screen.width
        protected sh = screen.height
        protected variable: scene.Renderable
        constructor() {
            this.variable = scene.createRenderable(this.zLayer1, (image: Image, camera: scene.Camera) => {
                if (this.size1 != 1) {
                    let screenclone = image.clone()
                    //helpers.imageBlit(image, (x1 - Math.trunc(x1)) * - size1, (y1 - Math.trunc(y1)) * - size1, sw + Math.ceil(size1), sh + Math.ceil(size1), screenclone, x1, y1, (sw - Math.ceil(size1)) / size1, (sh - Math.ceil(size1)) / size1, true, false)
                    image.fillRect(0, 0, this.sw, this.sh, 0)
                    helpers.imageBlit(image, this.x1, this.y1, this.sw * this.size1, this.sh * this.size1, screenclone, 0, 0, this.sw, this.sh, true, false)
                }
            })
        }
        public SetZoomFilter(size: number, anchor: Mode, ms = 25) {
            if (ms < 25) {
                ms = 25
            }
            this.memsize1 = size - this.size1
            for (let i = 0; i < (ms / 25); i++) {
                this.size1 += this.memsize1 / (ms / 25)
                if (anchor == 0 || anchor == 2 || anchor == 7) {
                    this.x1 = (this.sw / 2) - (this.sw / 2) * this.size1
                } else if (anchor == 3 || anchor == 5 || anchor == 8) {
                    this.x1 = this.sw - (this.sw * this.size1)
                }
                if (anchor == 0 || anchor == 4 || anchor == 5) {
                    this.y1 = (this.sh / 2) - (this.sh / 2) * this.size1
                } else if (anchor == 6 || anchor == 7 || anchor == 8) {
                    this.y1 = this.sh - (this.sh * this.size1)
                }
                pause(25)
            }
        }
        public SetZoomFilterOffset(size: number, x: number, y: number, ms = 25) {
            if (ms < 25) {
                ms = 25
            }
            this.memsize1 = size - this.size1
            for (let j = 0; j < (ms / 25); j++) {
                this.size1 += this.memsize1 / (ms / 25)
                this.x1 = -x + (this.sw / 2) - this.size1 * (this.sw / 2)
                this.y1 = -y + (this.sh / 2) - this.size1 * (this.sh / 2)
                pause(25)
            }
        }
        public destroy() {
            this.variable.destroy()
            this.y1 = this.x1 = this.memsize1 = this.size1 = this.zLayer1 = this.sw = this.sh = this.variable = null
        }
    }
    //% block="set screen zoom to $size times with anchor $anchor || over $ms ms"
    //% weight=2
    //% picker.fieldEditor="gridpicker"
    //% picker.fieldOptions.width=220
    //% picker.fieldOptions.columns=1
    //% picker=Mode
    //% ms.shadow="timePicker"
    //% expandableArgumentMode="toggle"
    //% group=Normal
    export function SetZoomFilter(size: number, anchor: Mode, ms = 25) {
        if (!zoomLayer) {
            zoomLayer = new Zoomable
        }
        zoomLayer.SetZoomFilter(size, anchor, ms)
    }
    //% block="set screen zoom to | $size times | with offset x $x y $y || over $ms ms"
    //% weight=1
    //% ms.shadow="timePicker"
    //% expandableArgumentMode="toggle"
    //% group=Normal
    export function SetZoomFilterOffset(size: number, x: number, y: number, ms = 25) {
        if (!zoomLayer) {
            zoomLayer = new Zoomable
        }
        zoomLayer.SetZoomFilterOffset(size, x, y, ms)
    }
    game.addScenePushHandler(() => {
        zoomLayer = new Zoomable
    })
}