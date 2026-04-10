package com.banaanae.foreverdale.titan.reflectable;

import com.banaanae.foreverdale.titan.json.LogicJSONObject;
import com.banaanae.foreverdale.titan.reflector.LogicJSONOutReflector;

public class LogicReflectable {
    public void destruct() {}
    
    public void save(LogicJSONObject obj) {
        final LogicJSONOutReflector out = new LogicJSONOutReflector(obj);
        
        
    }

    public int getReflectableId() {
        return 0;
    }
}
