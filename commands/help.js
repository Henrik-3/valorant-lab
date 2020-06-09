
module.exports = async (args, client, message, { Canvas, Discord }) => {
 
    
    message.channel.startTyping()
    
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    const background = await Canvas.loadImage("commands/images/Valorant_LABS.png"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
  
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
  
    const db = require('../db.js')
    const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
    
    
    //Text Help Overwiew
    ctx.text2('Help Overview', 180, 200, 800, '#ffffff', 'center')
  
    //Text Commands:
    ctx.text('Commands:', 140, 350, 250)
  
    //Text Help Command 
    ctx.text('- ' + prefix + 'help - Shows the help message', 110, 350 , 450)
  
    //Text Stats Command
    ctx.text('- ' + prefix + 'stats [RIOTNAME] - Shows the stats of the requested user', 110, 350 , 650)
  
    //Text Weapon Command:
    ctx.text('- ' + prefix + 'weapon [WEAPON NAME] - Get stats for requested weapon', 110, 350 , 850)
  
    //Text Ranked Command:
    ctx.text('- ' + prefix + 'settings news [#CHANNEL] - Set news channel', 110, 350 , 1650)
  
    //text settings command:
    ctx.text('- ' + prefix + 'settings - Get overview over the settings', 110, 350, 1250)
  
     //text prefix command:
    ctx.text('- ' + prefix + 'settings prefix [NEW PREFIX] - Set new prefix', 110, 350, 1450)
  
    //text patch command  
    ctx.text('- ' + prefix + 'weapons - Get overview over all available weapons', 110, 350, 1050)
  
    //Text Autonews:
    ctx.text('- ' + prefix + 'help2 - Shows the next help page', 110, 350, 1850, '#3f888f')

    
    ctx.text('Design by ouihq - Check out his Reyna Bot', 60, 2675, 2100, '#ffffff')

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

    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help.png" ); //final result
    message.channel.send(attachment) //send final result
    
    message.channel.stopTyping()
}

