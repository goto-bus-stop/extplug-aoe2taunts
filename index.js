define(function (require, exports, module) {

  var Plugin = require('extplug/Plugin')
    , $ = require('jquery')

  module.exports = Plugin.extend({
    name: 'Age of Empires 2 Taunts',
    description: 'Plays an Age of Empires 2 sound when taunt numbers are used in chat.',

    enable: function () {
      // load audio separately
      API.chatLog('Loading AoE2 Taunt audio files...')
      $.getScript('https://pluglynn.neocities.org/aoe2plug.taunts.js', function () {
        API.chatLog('AoE2 Taunts loaded!')
      })
      this.listenTo(API, API.CHAT, this.onChat)
    },

    disable: function () {
      if (window.TAUNTS) {
        window.TAUNTS = null
      }
    },

    onChat: function (e) {
      if (!window.TAUNTS) {
        return
      }
      var msg = e.message.trim()
        , digits = /^\d+/.exec(msg)
        , taunt = null

      if (digits) {
        digits = parseInt(digits[0], 10)
        if (digits >= 1 && digits <= 42) {
          var audio = $('<audio>')
            .attr('src', 'data:audio/wav;base64,' + TAUNTS[digits])
            .appendTo('body')
            .on('ended', function () {
              audio.remove()
            })
          audio[0].play()
        }
      }
    }
  });

});
