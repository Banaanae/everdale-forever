package com.banaanae.foreverdale.protocol.messages.client.home;

import com.banaanae.foreverdale.Server.Client;
import com.banaanae.foreverdale.protocol.PiranhaMessage;
import com.banaanae.foreverdale.protocol.messages.server.home.VerifyTimeResponseMessage;
import com.banaanae.foreverdale.titan.datastream.DataStream;
import com.banaanae.foreverdale.titan.xTimer;

public class VerifyTimeMessage extends PiranhaMessage {
    long clientTime;

    public VerifyTimeMessage(byte[] payload, Client session) {
        super(session);
        this.stream = DataStream.getByteStream(payload);
    }

    @Override
    public void decode() {
        this.clientTime = this.stream.readLongLong();
    }

    @Override
    public void execute() {
        long serverReceiveTime = xTimer.getNativeTime();
        new VerifyTimeResponseMessage(this.session, clientTime, serverReceiveTime).send();
    }

    @Override
    public int getMessageType() {
        return 16544;
    }
}