/**
 *
 * @param {Array} data
 * @param {Object} commands
 * @param {String} searchParams
 * @return {Object}
 */
module.exports = function (data, commands, searchParams) {
  if (searchParams !== 'all') {
    const toHuman = data.filter(c => !c.contexts && commands[searchParams]?.includes(c.name)).map(c => {
      return {
        name: c.name,
        description: c.description,
        nsfw: c.nsfw,
        id: c.id
      }
    })

    return {
      toHuman,
      raw: data.filter(c => !c.contexts && commands[searchParams]?.includes(c.name))
    }
  } else {
    const toHuman = data.filter(c => !c.contexts).map(c => {
      return {
        name: c.name,
        description: c.description,
        nsfw: c.nsfw,
        id: c.id
      }
    })

    return {
      toHuman,
      raw: data.filter(c => !c.contexts)
    }
  }
}