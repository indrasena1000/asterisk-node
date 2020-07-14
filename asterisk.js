const cmd=require('node-run-cmd');
const fs=require('fs');



function Register(num,pass){

var id=num;// give your own id this will be the extension
var secret=pass;// give your own secret

var sip=`\n[${id}]
type=friend
host=dynamic
secret=${secret}
context=internal`;

var extensions=`\nexten => ${id},1,Answer()
exten => ${id},2,Dial(SIP/${id},60)
exten => ${id},3,Playback(vm-nobodyavail)
exten => ${id},4,VoiceMail(${id}@main)
exten => ${id},5,Hangup()`;

var voicemail=`\n${id} => ${secret}`;

fs.appendFile('/etc/asterisk/sip.conf',sip,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("successfully updated sip.conf");
        
    }
});
fs.appendFile('/etc/asterisk/extensions.conf',extensions,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("successfully updated extensions.conf");
        
    }
});
fs.appendFile('/etc/asterisk/voicemail.conf',voicemail,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("successfully updated voicemail.conf");
        
    }
});

cmd.run(['asterisk -rx "dialplan reload"','asterisk -rx "sip reload"','asterisk -rx "voicemail reload"'])

}
async function Initialize(){
   await cmd.run(['rm -r /etc/asterisk/sip.conf','rm -r /etc/asterisk/extensions.conf','rm -r /etc/asterisk/voicemail.conf','touch /etc/asterisk/sip.conf','touch /etc/asterisk/extensions.conf','touch /etc/asterisk/voicemail.conf','asterisk -rx "dialplan reload"','asterisk -rx "sip reload"','asterisk -rx "voicemail reload"'])
    const sip=`[general]
context=internal
allowguest=no
allowoverlap=no
bindport=5060
bindaddr=0.0.0.0
srvlookup=no
disallow=all
allow=ulaw
alwaysauthreject=yes
canreinvite=no
nat=force_rport
sessiontimers=refuse
localnet=192.168.1.0/255.255.255.0`
    const extensions=`[internal]`;
    const voicemail=`[main]`;
    fs.appendFile('/etc/asterisk/sip.conf',sip,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("successfully initialized sip.conf");
            
        }
    });
    fs.appendFile('/etc/asterisk/extensions.conf',extensions,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("successfully initialized extensions.conf");
            
        }
    });
    fs.appendFile('/etc/asterisk/voicemail.conf',voicemail,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("successfully initialized voicemail.conf");
            
        }
    });
}



const command={
    init:Initialize,
    reg:Register
}
module.exports= command;
