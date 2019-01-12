<?xml version="1.0" encoding="UTF-8"?>
<tileset name="tileset" tilewidth="120" tileheight="120" tilecount="16" columns="4">
 <image source="Sprites/tileset.png" width="480" height="480"/>
 <tile id="0">
  <properties>
   <property name="collider" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="1">
  <properties>
   <property name="collider" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="2" x="-1" y="59" width="122" height="62"/>
   <object id="3" x="-1" y="1" width="60" height="57"/>
  </objectgroup>
 </tile>
 <tile id="2">
  <properties>
   <property name="collider" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0" y="59" width="119" height="61"/>
   <object id="2" x="60" y="-1" width="59" height="59"/>
  </objectgroup>
 </tile>
 <tile id="5">
  <properties>
   <property name="collider" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0" y="0" width="119" height="60"/>
   <object id="2" x="1" y="61" width="58" height="58"/>
  </objectgroup>
 </tile>
 <tile id="6">
  <properties>
   <property name="collider" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="1" y="1" width="118" height="59"/>
   <object id="2" x="63" y="63" width="56" height="57"/>
  </objectgroup>
 </tile>
 <tile id="9">
  <properties>
   <property name="collider" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="2" x="0" y="0" width="58" height="59">
    <properties>
     <property name="collider" type="bool" value="true"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="10">
  <properties>
   <property name="collider" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="61" y="2" width="58" height="57"/>
  </objectgroup>
 </tile>
 <tile id="11">
  <properties>
   <property name="collider" type="bool" value="true"/>
  </properties>
 </tile>
</tileset>
