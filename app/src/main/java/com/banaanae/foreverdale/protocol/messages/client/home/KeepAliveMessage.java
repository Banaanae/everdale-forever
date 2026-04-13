package com.banaanae.foreverdale.protocol.messages.client.home;

import com.banaanae.foreverdale.Server.Client;
import com.banaanae.foreverdale.protocol.PiranhaMessage;
import com.banaanae.foreverdale.protocol.messages.server.home.KeepAliveServerMessage;
import com.banaanae.foreverdale.titan.datastream.DataStream;

public class KeepAliveMessage extends PiranhaMessage {

    public KeepAliveMessage(byte[] payload, Client session) {
        super(session);
        this.stream = DataStream.getByteStream(payload);
    }

    @Override
    public void decode() {
    }

    @Override
    public void execute() {
        new KeepAliveServerMessage(this.session).send(true);
    }

    @Override
    public int getMessageType() {
        return 10108;
    }
}
