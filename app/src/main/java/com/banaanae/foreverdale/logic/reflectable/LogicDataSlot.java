package com.banaanae.foreverdale.logic.reflectable;

import com.banaanae.foreverdale.titan.reflectable.LogicReflectable;
import com.banaanae.foreverdale.titan.reflector.LogicJSONOutReflector;

public class LogicDataSlot extends LogicReflectable {
    LogicReflectable d;
    long c;
    
    public LogicDataSlot(LogicReflectable d, long c) {
        this.d = d;
        this.c = c;
    }
    
    @Override
    public void reflect(LogicJSONOutReflector reflector) {
        reflector.reflectReflectablePointerBase(d, "d");
        reflector.reflectLong(c, "c", 0);
    }
    
    @Override
    public int getReflectableId() {
        return 1001;
    }
}
