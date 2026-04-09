package com.banaanae.javasccore.protocol.messages.server.auth;

import com.banaanae.javasccore.Server.Client;
import com.banaanae.javasccore.protocol.PiranhaMessage;
import com.banaanae.javasccore.titan.LogicLong;
import com.banaanae.javasccore.titan.datastream.DataStream;
import java.util.Date;

public class LoginOkMessage extends PiranhaMessage {
    public int errorCode;
    public String fingerprint;
    public String redirectUri;
    public String contentUri;
    public String updateUri;
    public String reason;
    public int maintenanceTime;
    
    public LoginOkMessage(Client session) {
        super(session);
        this.stream = DataStream.getByteStream(new byte[0]);
    }
    
    @Override
    public void encode() {
        this.stream.writeLong(new LogicLong(0, 1));
        this.stream.writeLongLong(1);
        this.stream.writeString("");
        this.stream.writeString("");
        this.stream.writeString("");
        this.stream.writeInt(11);
        this.stream.writeInt(0);
        this.stream.writeInt(99);
        this.stream.writeInt(11);
        this.stream.writeString("dev");
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeString("");
        this.stream.writeString(String.valueOf(Math.floor(System.currentTimeMillis() / 1000)));
        this.stream.writeString("1714237625000");
        this.stream.writeInt(0);
        this.stream.writeString("");
        this.stream.writeString("AU");
        this.stream.writeString("");
        this.stream.writeInt(3);
        this.stream.writeString("https://assets.everdalegame.com");
        this.stream.writeString("https://game-assets.everdalegame.com");
        this.stream.writeString("");
        //const scidToken = new LogicCompressedString("1234567890")
        //scidToken.encode(this.stream)
        this.stream.writeInt(-1);
        this.stream.writeBoolean(true);
        this.stream.writeBoolean(false);
        this.stream.writeBoolean(false);
        this.stream.writeVInt(0);
        this.stream.writeStringReference("");
    }
    
    @Override
    public int getMessageType() {
        return 29125;
    }
    
    @Override
    public int getMessageVersion() {
        return 1;
    }
}
