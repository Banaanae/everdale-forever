package com.banaanae.foreverdale.protocol.messages.server.home;

import com.banaanae.foreverdale.Server.Client;
import com.banaanae.foreverdale.protocol.PiranhaMessage;
import com.banaanae.foreverdale.titan.datastream.DataStream;

public class KeepAliveServerMessage extends PiranhaMessage {

    public KeepAliveServerMessage(Client session) {
        super(session);
        byte[] buffer = new byte[0];
        this.stream = DataStream.getByteStream(buffer);
    }

    @Override
    public void encode() {
    }

    @Override
    public int getMessageType() {
        return 20108;
    }
}