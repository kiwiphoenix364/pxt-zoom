let size1 = 1
let x1 = 1
x1 = 0
let y1 = 1
y1 = 0
let buf = Buffer.create(120)
let zLayer = 1
let left = 1
let top = 1
let precalc = [0]
let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
    left = ((screen.width - screen.width / size1) / 2) + x1
    top = ((screen.height - screen.height / size1) / 2) + y1
    let screenclone = image.clone()
    for (let index5 = 0; index5 < 160; index5++) {
        for (let index6 = 0; index6 < 120; index6++) {
            buf[index6] = screenclone.getPixel(precalc[index5] + left, precalc[index6] + top)
        }
        image.setRows(index5, buf)
    }
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
    //% block="Zoom In Screen Image By %size Times Using On Game Update Anchor $anchor"
    export function SetZoomFilter(size: number, anchor: Mode) {
            let zLayer = 0
            let savedx = 0
            let buf = Buffer.create(120)
            let precalc = [0]
            let precalc2 = [0]
            precalc = []
            precalc2 = []
            let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                let screenclone = image.clone()
                let left = 0
                let top = 0
                if (anchor == 0 || anchor == 2 || anchor == 7) {
                    left = (screen.width - screen.width / size) / 2
                } else if (anchor == 3 || anchor == 5 || anchor == 8) {
                    left = (screen.width - screen.width / size)
                }
                if (anchor == 0 || anchor == 4 || anchor == 5) {
                    top = (screen.height - screen.height / size) / 2
                } else if (anchor == 6 || anchor == 7 || anchor == 8) {
                    top = (screen.height - screen.height / size)
                }
                for (let index = 0; index < 160; index++) {
                    precalc2.push((index / size) + left)
                }
                for (let index3 = 0; index3 < 120; index3++) {
                    precalc.push((index3 / size) + top)
                }
                for (let index5 = 0; index5 < 160; index5++) {
                    for (let index6 = 0; index6 < 120; index6++) {
                        buf[index6] = screenclone.getPixel(precalc2[index5], precalc[index6])
                    }
                    image.setRows(index5, buf)
                }
            }
            )
            control.runInParallel(() => variable.destroy())
        }
    //% block
    //% block="Zoom In Screen Image By %size Times Using On Game Update With Offset x $x y $y"
    export function SetZoomFilterOffset(size: number, x: number, y: number) {
            size1 = size
            x1 = x
            y1 = y
        precalc = []
        for (let index = 0; index < 160; index++) {
            precalc.push(index / size1)
        }
        }
}