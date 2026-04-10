# Foreverdale

Very early Everdale private server

## Setup

### Client

Client download (available when server actually good)

**Making your own:**

1. `pip install frida-gadget`
2. `frida --version` - If none install requirements.txt, if not v16 make venv
3. `frida-gadget --frida-version 16.7.19 --sign everdale.apk`
4. Install

### Server

1. Compile server (make sure you include Blake2b and tweetnacl)
2. Open apk then run frida.sh

## Credits
- Redirect and arxan killer script by S.B and bread (updated to everdale by me :)
- Using [java-sc-core](https://github.com/everdale-forever/java-sc-core), which is based on [nodebrawl-core](https://github.com/tailsjs/nodebrawl-core/blob/nightly/)