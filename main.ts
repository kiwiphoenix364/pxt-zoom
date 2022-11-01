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
    helpers.imageBlit(image, 16 % (size1) - 16, 12 % (size1) - 16, 176, 136, screenclone, x1, y1, 160 / size1, 120 / size1, true, false)
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
            size1 = size
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
            memsize = size1
            for (let i = 0; i < ms / (25); i++) {
                size1 = size1 + memsize / (ms / 25)
                pause(25)
            }
        }
    //% block
    //% block="zoom in screen image to %size times with offset x $x y $y over $ms ms"
    export function SetZoomFilterOffset(size: number, x: number, y: number, ms: number) {
            
            memsize = size - size1
            for (let i = 0; i < ms / (25); i++) {
                size1 = size1 + memsize / (ms / 25)
                x1 = x + (160 - (160 / size1)) / 2
                y1 = y + (120 - (120 / size1)) / 2
                pause(25)
            }
        }
}
