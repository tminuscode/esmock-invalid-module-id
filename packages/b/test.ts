import assert from 'assert'
import esmock from 'esmock'
import module from 'module'

describe('repro', function () {
    it('works ootb', async () => {
        const sut = await esmock('./index.ts', {
            a: {
                foo() {
                    return 'bar'
                }
            }
        })

        assert.equal(sut(), 'bar')
    })

    it('works roubdabout way', async () => {
        const require = module.createRequire(import.meta.url)

        const sut = await esmock('./index.ts', {
            [require.resolve('a')]: {
                foo() {
                    return 'bar'
                }
            }
        })

        assert.equal(sut(), 'bar')
    })
})
