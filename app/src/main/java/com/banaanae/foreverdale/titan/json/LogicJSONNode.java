package com.banaanae.foreverdale.titan.json;

public abstract class LogicJSONNode {
    public LogicJSONNode() {}
    
    public abstract int destruct();
    public abstract int getType();
    
    public abstract void writeToString(StringBuilder strBuilder);
}
