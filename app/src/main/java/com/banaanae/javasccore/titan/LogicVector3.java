package com.banaanae.javasccore.titan;

public class LogicVector3 {
    int x = 0;
    int y = 0;
    int z = 0; // Vertical (why minecraft)
    
    public LogicVector3(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    public LogicVector3() {}
    
    public void destruct() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    
    public LogicVector3 set(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    
    @Override
    public LogicVector3 clone() throws CloneNotSupportedException {
        super.clone();
        return new LogicVector3(x, y, z);
    }
    
    public LogicVector3 set(LogicVector3 vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        return this;
    }
    
    public void add(int x, int y, int z) {
        this.x += x;
        this.y += y;
        this.z += z;
    }
    
    public void add(LogicVector3 vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }
    
    public void subtract(int x, int y, int z) {
        this.x -= x;
        this.y -= y;
        this.z -= z;
    }
    
    public void subtract(LogicVector3 vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
    }
    
    public void multiply(int x, int y, int z) {
        this.x *= x;
        this.y *= y;
        this.z *= z;
    }
    
    public void multiply(LogicVector3 vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
    }
    
    public void divide(int divisor) {
        this.x /= divisor;
        this.y /= divisor;
        this.z /= divisor;
    }
    
    public int dot(LogicVector3 vector) {
        return x * vector.x + y * vector.y + z * vector.z;
    }
    
    public int getDistanceSquaredTo(int x2, int y2, int z2) {
        int dx = x2 - x;
        int dy = y2 - y;
        int dz = z2 - z;
        int dx2 = dx * dx;
        int dy2 = dy * dy;
        int dz2 = dz * dz;
        
        if (dx + 46340 <= 92680 &&
            dy + 46340 <= 92680 &&
            dz + 46340 <= 92680 &&
            dy2 < (dx2 ^ Integer.MAX_VALUE) &&
            dz2 < (dy2 ^ Integer.MAX_VALUE)) {
            
            return dx2 + dy2 + dz2;
        }
        
        return Integer.MAX_VALUE;
    }
    
    public int getDistanceSquared(LogicVector3 vector) {
        return getDistanceSquaredTo(vector.x, vector.y, vector.z);
    }
    
    public int getDistance(int x2, int y2, int z2) {
        return LogicMath.sqrt(getDistanceSquaredTo(x2, y2, z2));
    }
    
    public int getDistance(LogicVector3 vector) {
        return getDistance(vector.x, vector.y, vector.z);
    }
    
    public int getLengthSquared() {
        int x2 = x * x;
        int y2 = y * y;
        int z2 = z * z;
        
        if (x + 46340 <= 92680 &&
            y + 46340 <= 92680 &&
            z + 46340 <= 92680 &&
            y2 < (x2 ^ Integer.MAX_VALUE) &&
            z2 < (y2 ^ Integer.MAX_VALUE)) {
            
            return x2 + y2 + z2;
        }
        
        return Integer.MAX_VALUE;
    }
    
    public int getLength() {
        return LogicMath.sqrt(getLengthSquared());
    }
    
    public boolean isInArea(int x1, int y1, int z1, int x2, int y2, int z2) {
        return false;
    }
}
