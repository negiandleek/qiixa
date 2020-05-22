module.exports = api => {
  api.cache(true)
  return {
    presets: ['next/babel'],
    plugins: [
      ['@babel/plugin-proposal-optional-chaining'],
      ['@babel/plugin-proposal-nullish-coalescing-operator'],
    ]
  }
}
