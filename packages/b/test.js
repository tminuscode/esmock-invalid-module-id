import assert from 'assert'
import esmock from 'esmock'
import module from 'module'

describe('repro', function () {
    it('works ootb', async () => {
        const sut = await esmock('./index.js', {
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

        const sut = await esmock('./index.js', {
            [require.resolve('a')]: {
                foo() {
                    return 'bar'
                }
            }
        })

        assert.equal(sut(), 'bar')
    })
})
