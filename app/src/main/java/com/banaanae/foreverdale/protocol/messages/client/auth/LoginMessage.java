package com.banaanae.foreverdale.protocol.messages.client.auth;

import com.banaanae.foreverdale.Server.Client;
import com.banaanae.foreverdale.logic.server.LogicVersion;
import com.banaanae.foreverdale.protocol.PiranhaMessage;
import com.banaanae.foreverdale.protocol.messages.server.auth.LoginFailedMessage;
import com.banaanae.foreverdale.protocol.messages.server.auth.LoginOkMessage;
import com.banaanae.foreverdale.protocol.messages.server.auth.ServerHelloMessage;
import com.banaanae.foreverdale.protocol.messages.server.home.OwnHomeDataMessage;
import com.banaanae.foreverdale.titan.datastream.DataStream;
import com.banaanae.foreverdale.titan.enums.LoginFailedReason;

public class LoginMessage extends PiranhaMessage {    
    public LoginMessage(byte[] payload, Client session) {
        super(session);
        this.stream = DataStream.getByteStream(payload);
    }
    @Override
    public void decode() {
        return;
        /*this.stream.readLong();
        this.stream.readString();
        this.stream.readInt();
        this.stream.readInt();
        this.stream.readInt();
        this.stream.readString();
        this.stream.readString();
        this.stream.readString();
        this.stream.readString();
        this.stream.readString();
        final int high = this.stream.readVInt();
        if (high > 0);
            this.stream.readVInt();
        this.stream.readString();
        this.stream.readString();
        this.stream.readString();
        this.stream.readBoolean();
        this.stream.readStringReference();
        this.stream.readStringReference();
        this.stream.readStringReference();
        this.stream.readBoolean();
        this.stream.readString();
        this.stream.readInt();
        this.stream.readVInt();
        this.stream.readStringReference();
        this.stream.readStringReference();
        this.stream.readStringReference();
        this.stream.readStringReference();
        this.stream.readStringReference();
        this.stream.readVInt();
        this.stream.readString();
        this.stream.readStringReference();
        this.stream.readStringReference();
        this.stream.readStringReference();

        if (stream.readBoolean()|| true) {
            this.stream.readBytes();
        }

        this.stream.readString(); // Compressed
        this.stream.readVInt();
        this.stream.readBoolean();*/
    }
    
    @Override
    public void execute() {
        session.log("lok");
        new LoginOkMessage(session).send();
        session.log("ohd");
        new OwnHomeDataMessage(session).send();
        session.log("done");
    }
    
    @Override
    public int getMessageType() {
        return 10101;
    }
}
