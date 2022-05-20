//% color="#f76820"
namespace Zoom {
    //% block
    //% block="Zoom In Screen Image Using On Game Update By $size Times"
    export function SetBlurFilter(size: number) {
            let zLayer = 0
            let savedx = 0
            let buf = Buffer.create(120)
            let precalc = [0]
            precalc = []
            for (let index3 = 0; index3 < 120; index3++) {
                precalc.push(Math.constrain(index3 / size + 120 - (120 / size), 0, 119))
            }
            let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                for (let index = 0; index < 160; index++) {
                    savedx = Math.constrain(index / size + 160 - (160 / size), 0, 159)
                    for (let index2 = 0; index2 < 120; index2++) {
                        buf[index2] = image.getPixel(savedx, precalc[index2])
                    }
                    image.setRows(index, buf)
                }
            }
            )
            control.runInParallel(() => variable.destroy())
        }
}