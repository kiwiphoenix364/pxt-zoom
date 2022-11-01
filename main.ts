let y1 = 0
let x1 = 0
let memsize = 1
let size1 = 1
let buf = Buffer.create(120)
let zLayer = 1
let left = 1
let top = 1
let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
    let screenclone = image.clone()
    //helpers.imageBlit(image, (x1 - Math.trunc(x1)) * - size1, (y1 - Math.trunc(y1)) * - size1, 160 + Math.ceil(size1), 120 + Math.ceil(size1), screenclone, x1, y1, (160 - Math.ceil(size1)) / size1, (120 - Math.ceil(size1)) / size1, true, false)
    image.fillRect(0, 0, 160, 120, 0)
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
//% color="#3fcbf4"
namespace Zoom {
    //% block="set screen zoom to $size times with anchor $anchor || over $ms ms"
    //% picker.fieldEditor="gridpicker"
    //% picker.fieldOptions.width=220
    //% picker.fieldOptions.columns=1
    //% picker=Mode
    //% ms.shadow="timePicker"
    //% expandableArgumentMode="toggle"
    export function SetZoomFilter(size: number, anchor: Mode, ms = 25) {
        if (ms < 25) {
            ms = 25
        }
            memsize = size - size1
            for (let i = 0; i < (ms / 25); i++) {
                size1 += memsize / (ms / 25)
                if (anchor == 0 || anchor == 2 || anchor == 7) {
                    x1 = 80 - 80 * size1
                } else if (anchor == 3 || anchor == 5 || anchor == 8) {
                    x1 = 160 - (160 * size1)
                }
                if (anchor == 0 || anchor == 4 || anchor == 5) {
                    y1 = 60 - 60 * size1
                } else if (anchor == 6 || anchor == 7 || anchor == 8) {
                    y1 = 120 - (120 * size1)
                }
                pause(25)
            }
        }
    //% block="set screen zoom to $size times with offset x $x y $y || over $ms ms"
    //% ms.shadow="timePicker"
    //% expandableArgumentMode="toggle"
    export function SetZoomFilterOffset(size: number, x: number, y: number, ms = 25) {
        if (ms < 25) {
            ms = 25
        }
            memsize = size - size1
            for (let j = 0; j < (ms / 25); j++) {
                size1 += memsize / (ms / 25)
                x1 = x + 80 - size1 * 80
                y1 = y + 60 - size1 * 60
                pause(25)
            }
        }
}
