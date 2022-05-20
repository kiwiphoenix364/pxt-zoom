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
            for (let index1 = 0; index1 < Math.ceil(159 / size); index1++) {
                for (let index2 = 0; index2 < Math.ceil(size); index2++) {
                    precalc2.push(index1 + (159 - 159 / size) / 2)
                }
            }
        for (let index3 = 0; index3 < Math.ceil(119 / size); index3++) {
            for (let index4 = 0; index4 < Math.ceil(size); index4++) {
                    precalc.push(index3 + (119 - 119 / size) / 2)
                }
            }
            let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                for (let index = 0; index < 160; index++) {
                    for (let index2 = 0; index2 < 120; index2++) {
                        buf[index2] = image.getPixel(precalc2[index], precalc[index2])
                    }
                    image.setRows(index, buf)
                }
            }
            )
            control.runInParallel(() => variable.destroy())
        }
}