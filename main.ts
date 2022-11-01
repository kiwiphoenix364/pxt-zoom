let memsize = 1
let size1 = 1
let x1 = 0
let y1 = 0
let buf = Buffer.create(120)
let zLayer = 1
let left = 1
let top = 1
let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
    let screenclone = image.clone()
    //helpers.imageBlit(image, (x1 - Math.trunc(x1)) * - size1, (y1 - Math.trunc(y1)) * - size1, 160 + Math.ceil(size1), 120 + Math.ceil(size1), screenclone, x1, y1, (160 - Math.ceil(size1)) / size1, (120 - Math.ceil(size1)) / size1, true, false)
    helpers.imageBlit(image, x1, y1, 160 * size1, 120 * size1, screenclone, 0, 0, 159, 119, true, false)
})
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
//% color="#f76820"
namespace Zoom {
    //% block
    //% picker.fieldEditor="gridpicker"
    //% picker.fieldOptions.width=220
    //% picker.fieldOptions.columns=1
    //% picker=Mode
    //% block="zoom in screen image to %size times with anchor $anchor over $ms ms"
    export function SetZoomFilter(size: number, anchor: Mode, ms: number) {
            memsize = size - size1
            for (let i = 0; i < ms / (25); i++) {
                size1 = size1 + memsize / (ms / 25)
                if (anchor == 0 || anchor == 2 || anchor == 7) {
                    x1 = (160 - (160 / size1)) / 2
                } else if (anchor == 3 || anchor == 5 || anchor == 8) {
                    x1 = 160 - (160 / size1)
                }
                if (anchor == 0 || anchor == 4 || anchor == 5) {
                    y1 = (120 - (120 / size1)) / 2
                } else if (anchor == 6 || anchor == 7 || anchor == 8) {
                    y1 = 120 - (120 / size1)
                }
                pause(25)
            }
        }
    //% block
    //% block="zoom in screen image to %size times with offset x $x y $y over $ms ms"
    export function SetZoomFilterOffset(size: number, x: number, y: number, ms: number) {
            memsize = size - size1
            for (let i = 0; i < ms / (25); i++) {
                size1 = size1 + memsize / (ms / 25)
                x1 = x + 80 - size1 * 80 - ((160 - (160 / size1)) / 2)
                y1 = y + 60 - size1 * 60 - ((120 - (120 / size1)) / 2)
                pause(25)
            }
        }
}
