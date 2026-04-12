package com.banaanae.foreverdale.titan.reflectable;

import java.util.HashMap;
import java.util.Map;

public class BasicReflectableIdMap {
    public Map<Integer, LogicReflectable> reflectableIdMap;

    public BasicReflectableIdMap() {
        this.reflectableIdMap = new HashMap<>();
    }
    
    public void setObject(int id, LogicReflectable reflectable) {
        reflectableIdMap.put(id, reflectable);
    }
    
    public void removeObject(int id) {
        reflectableIdMap.remove(id);
    }

    public LogicReflectable getReflectableForId(int id) {
        LogicReflectable result = reflectableIdMap.get(id);
        
        if (result != null)
            return result;


        return null;
    }

    public LogicReflectable accessReflectableForId(int id) {
        // How are they different? idk
        LogicReflectable result = reflectableIdMap.get(id);
        
        if (result != null)
            return result;

        return null;
    }
}