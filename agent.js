const fs = require('fs');
module.exports = async (args, client, message, { Canvas, Discord }) => {
    const db = require('../db.js')
    var lang = db.get(`${message.guild.id}.lang`) || 'en'
    var linkjson = JSON.parse(fs.readFileSync('lang.json'))

    message.channel.startTyping()
    const canvasstats = Canvas.createCanvas(4100, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation
  
   //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
    ctx.font = size + 'px product_sans';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.fillText(content, x, y)
  }
  
    //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text2 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left', rotate=-0.5*Math.PI) {
    ctx.font = size + 'px valorant_font';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.save();
    ctx.translate(200,canvasstats.height/2);
    ctx.rotate(rotate);
    ctx.fillText(content , 0, 0);
    ctx.restore();
  }
    //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text3 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
    ctx.font = size + 'px valorant_font';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.fillText(content , x, y);
  }
    
    const Agents = {
    breach: {
      name: 'Breach',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png',
      ccost: linkjson[lang].breachccost,
      cability: linkjson[lang].breachcability,
      cabilitydescription: linkjson[lang].breachcabilitydescription,
      qcost: linkjson[lang].breachqcost,
      qability: linkjson[lang].breachqability,
      qabilitydescription: linkjson[lang].breachqabilitydescription,
      ecost: linkjson[lang].breachecost,
      eability: linkjson[lang].breacheability,
      eabilitydescription: linkjson[lang].breacheabilitydescription,
      xcost: linkjson[lang].breachxcost,
      xability: linkjson[lang].breachxability,
      xabilitydescription: linkjson[lang].breachxabilitydescription,
    },
    brimstone: {
      name: 'Brimstone',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt26fcf1b5752514ee/5eb7cdbfc1dc88298d5d3799/V_AGENTS_587x900_Brimstone.png',
      ccost: linkjson[lang].brimstoneccost,
      cability: linkjson[lang].brimstonecability,
      cabilitydescription: linkjson[lang].brimstonecabilitydescription,
      qcost: linkjson[lang].brimstoneqcost,
      qability: linkjson[lang].brimstoneqability,
      qabilitydescription: linkjson[lang].brimstoneqabilitydescription,
      ecost: linkjson[lang].brimstoneecost,
      eability: linkjson[lang].brimstoneeability,
      eabilitydescription: linkjson[lang].brimstoneeabilitydescription,
      xcost: linkjson[lang].brimstonexcost,
      xability: linkjson[lang].brimstonexability,
      xabilitydescription: linkjson[lang].brimstonexabilitydescription,
    },
    cypher: {
      name: 'Cypher',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt158572ec37653cf3/5eb7cdc19df5cf37047009d1/V_AGENTS_587x900_Cypher.png',
      ccost: linkjson[lang].cypherccost,
      cability: linkjson[lang].cyphercability,
      cabilitydescription: linkjson[lang].cyphercabilitydescription,
      qcost: linkjson[lang].cypherqcost,
      qability: linkjson[lang].cypherqability,
      qabilitydescription: linkjson[lang].cypherqabilitydescription,
      ecost: linkjson[lang].cypherecost,
      eability: linkjson[lang].cyphereability,
      eabilitydescription: linkjson[lang].cyphereabilitydescription,
      xcost: linkjson[lang].cypherxcost,
      xability: linkjson[lang].cypherxability,
      xabilitydescription: linkjson[lang].cypherxabilitydescription,
    },
    jett: {
      name: 'Jett',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltceaa6cf20d328bd5/5eb7cdc1b1f2e27c950d2aaa/V_AGENTS_587x900_Jett.png',
      ccost: linkjson[lang].jettccost,
      cability: linkjson[lang].jettcability,
      cabilitydescription: linkjson[lang].jettcabilitydescription,
      qcost: linkjson[lang].jettqcost,
      qability: linkjson[lang].jettqability,
      qabilitydescription: linkjson[lang].jettqabilitydescription,
      ecost: linkjson[lang].jettecost,
      eability: linkjson[lang].jetteability,
      eabilitydescription: linkjson[lang].jetteabilitydescription,
      xcost: linkjson[lang].jettxcost,
      xability: linkjson[lang].jettxability,
      xabilitydescription: linkjson[lang].jettxabilitydescription,
    },
    omen: {
      name: 'Omen',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt4e5af408cc7a87b5/5eb7cdc17bedc8627eff8deb/V_AGENTS_587x900_Omen.png',
      ccost: linkjson[lang].omenccost,
      cability: linkjson[lang].omencability,
      cabilitydescription: linkjson[lang].omencabilitydescription,
      qcost: linkjson[lang].omenqcost,
      qability: linkjson[lang].omenqability,
      qabilitydescription: linkjson[lang].omenqabilitydescription,
      ecost: linkjson[lang].omenecost,
      eability: linkjson[lang].omeneability,
      eabilitydescription: linkjson[lang].omeneabilitydescription,
      xcost: linkjson[lang].omenxcost,
      xability: linkjson[lang].omenxability,
      xabilitydescription: linkjson[lang].omenxabilitydescription,
    },
    phoenix: {
      name: 'Phoenix',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf0200e1821b5b39f/5eb7cdc144bf8261a04d87f9/V_AGENTS_587x900_Phx.png',
      ccost: linkjson[lang].pheonixccost,
      cability: linkjson[lang].pheonixcability,
      qcost: linkjson[lang].pheonixqcost,
      qability: linkjson[lang].pheonixqability,
      ecost: linkjson[lang].pheonixecost,
      eability: linkjson[lang].pheonixeability,
      xcost: linkjson[lang].pheonixxcost,
      xability: linkjson[lang].pheonixxability,
      xabilitydescription: linkjson[lang].pheonixxabilitydescription,
    },
    raze: {
      name: 'Raze',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6fef56a8182d0a81/5ebf2c2798f79d6925dbd6b4/V_AGENTS_587x900_ALL_Raze_2.png',
      ccost: linkjson[lang].razeccost,
      cability: linkjson[lang].razecability,
      qcost: linkjson[lang].razeqcost,
      qability: linkjson[lang].razeqability,
      ecost: linkjson[lang].razeecost,
      eability: linkjson[lang].razeeability,
      xcost: linkjson[lang].razexcost,
      xability: linkjson[lang].razexability,
      xabilitydescription: linkjson[lang].razexabilitydescription,
    },
    sage: {
      name: 'Sage',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt8a627ec10b57f4f2/5eb7cdc16509f3370a5a93b7/V_AGENTS_587x900_sage.png',
      ccost: linkjson[lang].sageccost,
      cability: linkjson[lang].sagecability,
      qcost: linkjson[lang].sageqcost,
      qability: linkjson[lang].sageqability,
      ecost: linkjson[lang].sageecost,
      eability: linkjson[lang].sageeability,
      xcost: linkjson[lang].sagexcost,
      xability: linkjson[lang].sagexability,
      xabilitydescription: linkjson[lang].sagexabilitydescription,
    },
    sova: {
      name: 'Sova',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf11234f4775729b7/5ebf2c275e73766852c8d5d4/V_AGENTS_587x900_ALL_Sova_2.png',
      ccost: linkjson[lang].sovaccost,
      cability: linkjson[lang].sovacability,
      qcost: linkjson[lang].sovaqcost,
      qability: linkjson[lang].sovaqability,
      ecost: linkjson[lang].sovaecost,
      eability: linkjson[lang].sovaeability,
      xcost: linkjson[lang].sovaxcost,
      xability: linkjson[lang].sovaxability,
      xabilitydescription: linkjson[lang].sovaxabilitydescription,
    },
    viper: {
      name: 'Viper',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltc825c6589eda7717/5eb7cdc6ee88132a6f6cfc25/V_AGENTS_587x900_Viper.png',
      ccost: linkjson[lang].viperccost,
      cability: linkjson[lang].vipercability,
      qcost: linkjson[lang].viperqcost,
      qability: linkjson[lang].viperqability,
      ecost: linkjson[lang].viperecost,
      eability: linkjson[lang].vipereability,
      xcost: linkjson[lang].viperxcost,
      xability: linkjson[lang].viperxability,
      xabilitydescription: linkjson[lang].viperxabilitydescription,
    },
    reyna: {
      name: 'reyna',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6577b1f58530e6b2/5eb7cdc121a5027d77420208/V_AGENTS_587x900_Reyna.png',
      ccost: linkjson[lang].reynaccost,
      cability: linkjson[lang].reynacability,
      qcost: linkjson[lang].reynaqcost,
      qability: linkjson[lang].reynaqability,
      ecost: linkjson[lang].reynaecost,
      eability: linkjson[lang].reynaeability,
      xcost: linkjson[lang].reynaxcost,
      xability: linkjson[lang].reynaxability,
      xabilitydescription: linkjson[lang].reynaxabilitydescription,
    },

  }
    
  if (!args.length) {
    const Embed = new Discord.MessageEmbed()
        .setColor('#ee3054')
        .setTitle(linkjson[lang].agentunknown)
        .setTimestamp()
        .setFooter('VALORANT LABS [AGENT ERROR ]');
      message.channel.send(Embed);
      message.channel.stopTyping()
  } else {
  const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
  // Cut start to get the name
  const name = message.content.toLowerCase().substr(prefix.length + 6)
  // lookup data for weapon
  const agent = Agents[name]
  if(agent) {
  if(name == 'breach') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if(name == 'brimstone') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'cypher') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'jett') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'omen') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'phoenix') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'raze') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'reyna') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'sage') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'sova') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'viper') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  }
  //Avatar
  // Pick up the pen
  ctx.beginPath();
  // Start the arc to form a circle
  ctx.arc(130, 2025, 80, 0, Math.PI * 2, true);
  // Put the pen down
  ctx.closePath();
  // Clip off the region you drew on
  ctx.clip();
  
  const avatarl = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg'}));
  ctx.drawImage(avatarl, 30, 1925, 200, 200)
    
  const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-agents.png" ); //final result
  message.channel.send(attachment); //send final result
  message.channel.stopTyping()
  } else {
    const Embed = new Discord.MessageEmbed()
        .setColor('#ee3054')
        .setTitle(linkjson[lang].agentunknown)
        .setTimestamp()
        .setFooter('VALORANT LABS [AGENT ERROR]');
      message.channel.send(Embed);
      message.channel.stopTyping()
  }
 }
}