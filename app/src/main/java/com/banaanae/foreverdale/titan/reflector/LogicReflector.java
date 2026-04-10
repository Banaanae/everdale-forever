package com.banaanae.foreverdale.titan.reflector;

import com.banaanae.foreverdale.titan.Debugger;
import com.banaanae.foreverdale.titan.GlobalID;

public class LogicReflector {
    public void destruct() {}
    
    public void checkReflectableIdRequiredType(int id, int reqType) {
        if (GlobalID.getClassId(id) != reqType && reqType != -1)
            Debugger.error("checkReflectableIdRequiredType: required type mismatch");
    }
}
