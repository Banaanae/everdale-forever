package com.banaanae.foreverdale.protocol.messages.client.home;

import com.banaanae.foreverdale.Server.Client;
import com.banaanae.foreverdale.protocol.PiranhaMessage;
import com.banaanae.foreverdale.protocol.messages.server.home.VerifyTimeResponseMessage;
import com.banaanae.foreverdale.titan.datastream.DataStream;

public class VerifyTimeMessage extends PiranhaMessage {
    long clientTime;

    public VerifyTimeMessage(byte[] payload, Client session) {
        super(session);
        this.stream = DataStream.getByteStream(payload);
    }

    @Override
    public void decode() {
        this.clientTime = this.stream.readLongLong();
        System.out.println("Client time synchronization requested: " + this.clientTime);
    }

    @Override
    public void execute() {
        new VerifyTimeResponseMessage(this.session).send(true);
    }

    @Override
    public int getMessageType() {
        return 16544;
    }
}