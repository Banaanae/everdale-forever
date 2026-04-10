package com.banaanae.foreverdale.protocol.messages.server.auth;

import com.banaanae.foreverdale.Server.Client;
import com.banaanae.foreverdale.protocol.PiranhaMessage;
import com.banaanae.foreverdale.titan.datastream.DataStream;

public class LoginFailedMessage extends PiranhaMessage {
    public int errorCode;
    public String fingerprint;
    public String redirectUri;
    public String contentUri;
    public String updateUri;
    public String reason;
    public int maintenanceTime;
    
    public LoginFailedMessage(Client session) {
        super(session);
        this.stream = DataStream.getByteStream(new byte[0]);
    }
    
    @Override
    public void encode() {
        stream.writeInt(this.errorCode);
        stream.writeString(this.fingerprint);
        stream.writeString(this.redirectUri);
        stream.writeString(this.contentUri);
        stream.writeString(this.updateUri);
        stream.writeString(this.reason);
        stream.writeVInt(this.maintenanceTime);
    }
    
    @Override
    public int getMessageType() {
        return 20103;
    }
}
