const { expect } = require('chai')
const configure = require('../src/configure')

describe('Configure', () => {
  it('load default json configuration file', () => {
    const config = configure()
    expect(config.redis).to.eql({"host": "redis", "port": 6379})
  })
  it('load custom configuration', () => {
    const config_custom = {"custom": "value"}
    const config = configure(config_custom)
    expect(config).to.eql({"redis": {"host": "redis", "port": 6379}, "custom": "value"})
  })
})
