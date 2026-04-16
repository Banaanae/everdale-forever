package com.banaanae.foreverdale.protocol.messages.server.home;

import com.banaanae.foreverdale.Server.Client;
import com.banaanae.foreverdale.protocol.PiranhaMessage;
import com.banaanae.foreverdale.titan.datastream.DataStream;
import com.banaanae.foreverdale.titan.xTimer;

public class VerifyTimeResponseMessage extends PiranhaMessage {
    long clientSendTime;
    long serverReceiveTime;

    public VerifyTimeResponseMessage(Client session, long clientSendTime, long serverReceiveTime) {
        super(session);
        this.stream = DataStream.getByteStream(new byte[64]);
        this.clientSendTime = clientSendTime;
        this.serverReceiveTime = serverReceiveTime;
    }

    @Override
    public void encode() {
        this.stream.writeLongLong(clientSendTime);
        this.stream.writeLongLong(serverReceiveTime);
        long serverSendTime = xTimer.getNativeTime(); 
        this.stream.writeLongLong(serverSendTime);
        this.stream.writeLongLong(serverSendTime);
        this.stream.writeLongLong(serverSendTime);
    }

    @Override
    public int getMessageType() {
        return 27969;
    }
}