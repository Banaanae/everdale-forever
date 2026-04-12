package com.banaanae.foreverdale.logic.reflectable;

import com.banaanae.foreverdale.titan.reflectable.LogicReflectable;
import com.banaanae.foreverdale.titan.reflector.LogicJSONOutReflector;

// shit name
public class Logic1001 extends LogicReflectable {
    
    @Override
    public void reflect(LogicJSONOutReflector reflector) {
        LogicReflectable a = new LogicReflectable();
        reflector.reflectReflectablePointerBase(a, "d");
        reflector.reflectLong(123, "c", 0);
    }
    
    @Override
    public int getReflectableId() {
        return 1001;
    }
}
