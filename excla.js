// exclamation script

function ExclaAST(code) {
    let buf = "";
    let macroname = "";
    let memmacname = "";
    let state = 0;
    let argbody = "";
    let argv = []
    let mfunc = "";
    let escaped = false

    let impl_stuff = "";

    for (let i = 0; i < code.length; i++) {
        const cur = code[i];
        
        const next = code[i+1];

        if (cur == '#' && state == 0) {
            state = 923992239
            break;
        } 
        else if (cur == '!' && state == 0) {
            state = 555
        } else if (cur == '@' && state == 0) {
            state = 556
        } else if (cur == '$' && state == 0) {
            state = 557
        } else if (cur == ' ' && state == 555) {
            memmacname = buf;
            state = 999; // pickup
            buf = "";  
        } else if (cur == ' ' && state == 556) {
            impl_stuff = buf;
            state = 999; // pickup
            buf = "";  
        } else if (cur == ' ' && state == 999) {
            argv.push(buf.trim())
            buf = "";
        } else if (cur == '{' && state == 999) {
            state = 2000  
        } else if (cur == '}' && state == 2000) {
            argbody = buf.trim();
            argv.push(argbody);
            state = 999
            buf = "";  
           
        } else if (cur == '"' && state == 999) {
            state = 1999
        } else if (cur == '"' && state == 1999 && code[i-1] != '\\') {
            state = 999  
        } else if (cur == '\\' && state == 1999) {
            escaped = true;
            switch (code[i+1]) {
                case 'n':
                    buf += '\n'
                    break;
                case '"':
                    buf += '"'
                    break;
                default:
                    break;
            }
        } else {
            if (cur == '}' || cur == '{' || cur == '!' || cur == '@' && state != 1999 && state != 923992239) {
                console.log("excla: error: unexpected token '" + cur + "' at position " + i + "\ntoken:\n\t" + cur)
                return null
            }
            if (!escaped) {
                buf += cur;
            } else {
                escaped = false;
            }
            
        }
    }
    argv = argv.filter(function(entry) { return entry.trim() != ''; });
    if (buf.length > 0 && state == 999) {
        state = 0

        argv.push(buf.trim())
        buf = "";
    } 

    return {
        "implementationMacro": impl_stuff || null,
        "generalMacro": memmacname || null,
        "arguments": argv
    }
}

