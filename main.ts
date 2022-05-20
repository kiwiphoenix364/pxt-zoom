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
            for (let index3 = 0; index3 < 60; index3++) {
                precalc.push(index3 + 40)
                precalc.push(index3 + 40)
            }
            let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                for (let index = 0; index < 160; index++) {
                    savedx = index
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