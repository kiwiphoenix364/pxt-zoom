//% color="#83de8a"
namespace Blur {
    //% block
    //% block="Apply Blur Filter Using On Game Update With Pixel Size $size"
    export function SetBlurFilter(size: number) {
        if (size >= 5) {
            let zLayer = 0
            let savedx = 0
            let buf = Buffer.create(120)
            let precalc = [0]
            let var1 = 0
            let var2 = 0
            let var3 = 120 / size
            precalc = []
            for (let index3 = 0; index3 < var3; index3++) {
                precalc.push(Math.constrain(index3 * size + size / 2, 0, 119))
            }
            let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                for (let index = 0; index < 160; index++) {
                    savedx = Math.constrain((Math.round(index / size)) * size + size / 2, 0, 159)
                    for (let index2 = 0; index2 < var3; index2++) {
                        var1 = index2 * size
                        var2 = image.getPixel(savedx, precalc[index2])
                        for (let index3 = 0; index3 < size; index3++) {
                            buf[var1 + index3] = var2
                        }
                    }
                    image.setRows(index, buf)
                }
            }
            )
            control.runInParallel(() => variable.destroy())
        } else {
            let zLayer = 0
            let savedx = 0
            let buf = Buffer.create(120)
            let precalc = [0]
            precalc = []
            for (let index3 = 0; index3 < 120; index3++) {
                precalc.push((index3 / size + (120 - size)) / 2)
            }
            let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                for (let index = 0; index < 160; index++) {
                    savedx = ((index / size + (120 - size)) / 2)
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
}