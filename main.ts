//% color="#f76820"
namespace Zoom {
    //% block
    //% block="Zoom In Screen Image By %size Times Using On Game Update"
    export function SetZoomFilter(size: number) {
            let zLayer = 0
            let savedx = 0
            let buf = Buffer.create(120)
            let precalc = [0]
            let precalc2 = [0]
            precalc = []
            precalc2 = []
            let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                let screenclone = image.clone()
                let left = (screen.width - screen.width / size) / 2
                let top = (screen.height - screen.height / size) / 2
                for (let index = 0; index < 160; index++) {
                    precalc2.push(Math.floor(index / size) + left)
                }
                for (let index3 = 0; index3 < 120; index3++) {
                    precalc.push(Math.floor(index3 / size) + top)
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
    //% block="Zoom In Screen Image From %size Times To %size2 Times Over %time ms"
    export function SetZoomFilterFrom__To__(size: number, size2: number, time: number) {
        let dif = size - size2
        let realsize = size
        let zLayer = 0
        let savedx = 0
        let buf = Buffer.create(120)
        let precalc = [0]
        let precalc2 = [0]
        precalc = []
        precalc2 = []
        control.runInParallel(() => {for (let repeat = 0; repeat < time / 50; repeat++) {
            realsize += dif / time
            pause(50)
        }})
        let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
            let screenclone = image.clone()
            let left = (screen.width - screen.width / realsize) / 2
            let top = (screen.height - screen.height / realsize) / 2
            for (let index = 0; index < 160; index++) {
                precalc2.push(Math.floor(index / realsize) + left)
            }
            for (let index3 = 0; index3 < 120; index3++) {
                precalc.push(Math.floor(index3 / realsize) + top)
            }
            for (let index5 = 0; index5 < 160; index5++) {
                for (let index6 = 0; index6 < 120; index6++) {
                    buf[index6] = screenclone.getPixel(precalc2[index5], precalc[index6])
                }
                image.setRows(index5, buf)
            }
        }
        )
        control.runInParallel(() => {pause(time)
        variable.destroy()
        })
        }
}