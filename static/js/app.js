$(document).ready(function() {
  var plot = plot2D({
    width: 630, 
    height: 1200, 
    onBrushUpdate: jmolShowSelection,
    onInteractionClick: jmolShowInteraction
  });

  var motifs = {};
  d3.json('static/data/16S-ecoli-motifs.js', function(d) { motifs = d; });

  d3.json('static/data/16S-ecoli.js', function(data) {
    plot.coordinates(data);

    d3.csv('static/data/16S-ecoli-interactions.csv', function(data) {
      plot.interactions(data);
      d3.select('#rna-2d').call(plot);
      plot.brush.enable();
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
    return toggler({
      onChange: function($e1, status, e) {
        plot.toggleInteraction(family);
      },
      width: 120,
      label: {
        enabled: 'Shown',
        disabled: 'Hidden'
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

  $('#motif-box-toggle').toggleButtons(toggler({
    onChange: function($e1, status, e) {
      for(var id in motifs) {
        plot.toggleNucleotideBox(id, motifs[id].nucleotides);
      }
    },
    width: 120,
    label: {
      enabled: 'Shown',
      disabled: 'Hidden'
    }
  }));

  $('#motif-color-toggle').toggleButtons(toggler({
    onChange: function($e1, status, e) {
      var patt = /^HL/;
      for(var id in motifs) {
        var color = 'blue';
        if (patt.test(id)) {
          color = 'green';
        }
        plot.toggleNucleotideColor(id, color);
      }
    },
    width: 120,
    label: {
      enabled: 'Shown',
      disabled: 'Hidden'
    }
  }));

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

  $('#mode-controls-title').click(function() {
    $('#mode-controls').toggle();
  });
  $('#interaction-controls-title').click(function() {
    $('#interaction-controls').toggle();
  });
  $('#interaction-controls').toggle();
});
