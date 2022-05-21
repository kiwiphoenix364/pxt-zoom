//% color="#f76820"
namespace Zoom {
    //% block
    //% block="Zoom In Screen Image Using On Game Update By $size Times"
    export function SetBlurFilter(size: number) {
            let zLayer = 0
            let savedx = 0
            let buf = Buffer.create(120)
            let precalc = [0]
            let precalc2 = [0]
            precalc = []
            precalc2 = []
            let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                for (let index = 0; index < 160; index++) {
                    precalc2.push(Math.ceil(index / size + (159 - 159 / size) / 2))
                }
                for (let index3 = 0; index3 < 120; index3++) {
                    precalc.push(Math.ceil(index3 / size + (119 - 119 / size) / 2))
                }
                for (let index5 = 0; index5 < 160; index5++) {
                    for (let index6 = 0; index6 < 120; index6++) {
                        buf[index6] = image.getPixel(precalc2[index5], precalc[index6])
                    }
                    image.setRows(index5, buf)
                }
            }
            )
            control.runInParallel(() => variable.destroy())
        }
}