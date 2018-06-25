$(document).ready( function() { 
   initDatabase();
});


function initDatabase() {

   if(typeof(Storage) !== "undefined") {

      if (sessionStorage.getItem("isInit") == null) {

         // Benutzer
         var userImmanuelPforte = User.getGateKeeperUser("Immanuel", "Pforte", "pf", "pf");
         var userManfredMustermi = User.getRoomManagerUser("Manfred", "Mustermi", "rv", "rv");

         // Ausleihende
         var ausleihendeExternHaraldHardWorker = Person.getExternalPerson("Harald", "Hardworker", "HH Dienstleistungen");
         var studentSvenMueller = Person.getStudent("Sven", "Müller", "11145031");
         var studentTimoMueller = Person.getStudent("Timo", "Müller", "11155701");
         var studentStefanieStudia = Person.getStudent("Stefanie", "Studia", "11111111");

         // Räume
         var usabilityStudio = new Room("0.503", "Usability Studio");
         var dreieinsnullsechs = new Room("3.106", "");
         var kienbaumSaal = new Room("0.402", "Kienbaum Saal");
         var zweidreinullzwei = new Room("2.302", "");
         var einsnulleinisdrei = new Room("1.013", "");
         var dreizweizweizwei = new Room("3.222", "");
         
         // Transponder
         var t35 = new Transponder("T35");
         var f06 = new Transponder("F06");
         var h09 = new Transponder("H09");

         var perDreiEinsNullSechs1 = PermissionFactory.create(dreieinsnullsechs, studentSvenMueller, new Date("2020-01-01"));
         var perDreiEinsNullSechs2 = PermissionFactory.create(dreieinsnullsechs, studentTimoMueller, null);
         var perStefanie1 = PermissionFactory.create(zweidreinullzwei, studentStefanieStudia, null);
         var perStefanie2 = PermissionFactory.create(einsnulleinisdrei, studentStefanieStudia, null);
         var perStefanie3 = PermissionFactory.create(dreizweizweizwei, studentStefanieStudia, null);

         // Einfache 1:n-/n:1- und n:m-Verknüpfungen müssen vor dem Speichern den Objekten zugewiesen werden,
         // damit beim Speichern diese direkt in den Objekten mitgespeichert werden.
         RoomManagerRelationManager.addLinkBetweenRoomManagerAndRoom(userManfredMustermi, usabilityStudio);
         RoomManagerRelationManager.addLinkBetweenRoomManagerAndRoom(userManfredMustermi, dreieinsnullsechs);
         RoomManagerRelationManager.addLinkBetweenRoomManagerAndRoom(userManfredMustermi, kienbaumSaal);

         TransponderRelationManager.addLinkBetweenTransponderAndRoom(t35, zweidreinullzwei);
         TransponderRelationManager.addLinkBetweenTransponderAndRoom(f06, zweidreinullzwei);
         TransponderRelationManager.addLinkBetweenTransponderAndRoom(h09, zweidreinullzwei);

         PermissionRepository.add(perDreiEinsNullSechs1);
         PermissionRepository.add(perDreiEinsNullSechs2);
         PermissionRepository.add(perStefanie1);
         PermissionRepository.add(perStefanie2);
         PermissionRepository.add(perStefanie3);
         
         // Entities
         UserRepository.add(userImmanuelPforte);
         UserRepository.add(userManfredMustermi);

         RoomRepository.add(usabilityStudio);
         RoomRepository.add(dreieinsnullsechs);
         RoomRepository.add(kienbaumSaal);
         RoomRepository.add(zweidreinullzwei);
         RoomRepository.add(einsnulleinisdrei);
         RoomRepository.add(dreizweizweizwei);

         PersonRepository.add(studentStefanieStudia);
         PersonRepository.add(studentSvenMueller);
         PersonRepository.add(studentTimoMueller);
         PersonRepository.add(ausleihendeExternHaraldHardWorker);

         TransponderRepository.add(t35);
         TransponderRepository.add(f06);
         TransponderRepository.add(h09);

         sessionStorage.setItem("isInit", "true");
      }
   } else {
       alert("Sorry, your browser does not support web storage...");
    }
}