package com.banaanae.foreverdale.protocol.messages.server.home;

import com.banaanae.foreverdale.Server.Client;
import com.banaanae.foreverdale.protocol.PiranhaMessage;
import com.banaanae.foreverdale.titan.datastream.DataStream;

public class VerifyTimeResponseMessage extends PiranhaMessage {

    public VerifyTimeResponseMessage(Client session) {
        super(session);
        this.stream = DataStream.getByteStream(new byte[64]);
    }

    @Override
    public void encode() {
        for (int i = 0; i < 5; i++) {
            this.stream.writeLongLong(0L);
        }

        long serverTime = System.currentTimeMillis()* 1000000L;
        this.stream.writeLongLong(serverTime);
        
        System.out.println("[VerifyTime] Sent response with time: " + serverTime);
    }

    @Override
    public int getMessageType() {
        return 27969;
    }
}