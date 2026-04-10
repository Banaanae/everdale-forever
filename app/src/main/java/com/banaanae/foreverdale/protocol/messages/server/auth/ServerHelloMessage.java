package com.banaanae.foreverdale.protocol.messages.server.auth;

import com.banaanae.foreverdale.Server.Client;
import com.banaanae.foreverdale.logic.server.LogicConfig;
import com.banaanae.foreverdale.protocol.PiranhaMessage;
import com.banaanae.foreverdale.titan.datastream.DataStream;
import java.security.SecureRandom;

public class ServerHelloMessage extends PiranhaMessage {
    public ServerHelloMessage(Client session) {
        super(session);
        this.stream = DataStream.getByteStream(new byte[0]);
    }
    
    @Override
    public void encode() {
        if (LogicConfig.Crypto.ACTIVATED) {
            SecureRandom secureRandom = new SecureRandom();
            byte[] nonce = new byte[24];
            secureRandom.nextBytes(nonce);
            this.stream.writeBytes(nonce, 24);
            return;
        }
        
        this.stream.writeBytes(new byte[24], 24);
    }
    
    @Override
    public int getMessageType() {
        return 20100;
    }
}
