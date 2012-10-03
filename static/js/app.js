$(document).ready(function() {
  var plot = plot2D({
    width: 630, 
    height: 795,
    onBrushUpdate: jmolShowSelection,
    onInteractionClick: jmolShowInteraction
  });

  d3.json('static/data/16S-ecoli.js', function(data) {
    plot.coordinates(data);

    d3.csv('static/data/16S-ecoli-interactions.csv', function(data) {
      plot.interactions(data);
      d3.select('#rna-2d').call(plot);
      plot.toggleInteraction('ncWW');
      plot.brush.enable();

      $('#cww-toggle').toggleButtons(family_toggle('cWW'));
      $('#tww-toggle').toggleButtons(family_toggle('tWW'));
      $('#cwh-toggle').toggleButtons(family_toggle('cWH'));
      $('#twh-toggle').toggleButtons(family_toggle('tWH'));
      $('#cws-toggle').toggleButtons(family_toggle('cWS'));
      $('#tws-toggle').toggleButtons(family_toggle('tWS'));
      $('#chh-toggle').toggleButtons(family_toggle('cHH'));
      $('#thh-toggle').toggleButtons(family_toggle('tHH'));
      $('#chs-toggle').toggleButtons(family_toggle('cHS'));
      $('#ths-toggle').toggleButtons(family_toggle('tHS'));
      $('#css-toggle').toggleButtons(family_toggle('cSS'));
      $('#tss-toggle').toggleButtons(family_toggle('tSS'));
    });
  });

  var toggler = function(given) {
    var conf = {
      animated: true,
      transitionspeed: 0.25,
      width: 110,
      style: {
        enabled: 'primary',
        disabled: 'primary'
      }
    };
    return $.extend({}, conf, given);
  };

  var family_toggle = function(family) {
    var fam = $('.' + family);
    if (fam.length == 0) {
      fam = $('.n' + family);
    }
    var bg_color = fam.css('stroke');
    var gradient = fam.css('fill');
    return toggler({
      onChange: function($e1, status, e) {
        plot.toggleInteraction(family);
        plot.toggleInteraction('n' + family);
      },
      width: 100,
      style: {
        custom: {
          disabled: {
            color: bg_color,
            background: "#FEFEFE",
            gradient: "#E6E6E6"
          },
          enabled: {
            background: bg_color,
            gradient: gradient
          }
        }
      },
      label: {
        disabled: 'Show',
        enabled: 'Hide'
      } 
    })
  };

  $('#mode-button').toggleButtons(toggler({
    onChange: function($el, status, e) {
      plot.brush.toggle();
    },
    label: {
      enabled: 'Select',
      disabled: 'Click'
    }
  }));

});
