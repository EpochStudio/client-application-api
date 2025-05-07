/**
 *
 * @param {Array} data
 * @param {Object} commands
 * @param {String} searchParams
 * @return {Object}
 */
module.exports = function (data, commands, searchParams) {
  const template = data.filter(c => !c.contexts)

  if (searchParams !== 'all') {
    const toHuman = template.filter(c => commands[searchParams]?.includes(c.name)).map(c => {
      return {
        name: c.name,
        description: c.description,
        nsfw: c.nsfw,
        id: c.id
      }
    })

    return {
      toHuman,
      raw: template.filter(c => commands[searchParams]?.includes(c.name))
    }
  } else {
    const toHuman = template.map(c => {
      return {
        name: c.name,
        description: c.description,
        nsfw: c.nsfw,
        id: c.id
      }
    })

    return {
      toHuman,
      raw: template
    }
  }
}