'use strict'

$(document).ready( function() { 
   initDatabase();
});


function initDatabase() {

    if (typeof Storage !== undefined) {

        if (sessionStorage.getItem('isInit') === null) {

            // Benutzer
            var userImmanuelPforte = User.getGateKeeperUser('Immanuel', 'Pforte', 'pf', 'pf');
            var userManfredMustermi = User.getRoomManagerUser('Manfred', 'Mustermi', 'rv', 'rv');

            // Ausleihende
            var ausleihendeExternHaraldHardWorker = Person.getExternalPerson('Harald', 'Hardworker', 'HH Dienstleistungen');
            var studentSvenMueller = Person.getStudent('Sven', 'Müller', '11145031');
            var studentTimoMueller = Person.getStudent('Timo', 'Müller', '11155701');
            var studentStefanieStudia = Person.getStudent('Stefanie', 'Studia', '11111111');
            var employeeManfredMi = Person.getStudent('Manfred', 'Mustermi', '');
            var studentPeterStudi = Person.getStudent('Peter', 'Studi', '11118932');
            var studentSandraBlume = Person.getStudent('Sandra', 'Blume', '11118754');

            // Räume
            var usabilityStudio = new Room('0.503', 'Usability Studio');
            var dreieinsnullsechs = new Room('3.106', '');
            var kienbaumSaal = new Room('0.402', 'Kienbaum Saal');
            var zweidreinullzwei = new Room('2.302', '');
            var einsnulleinisdrei = new Room('1.013', '');
            var dreizweizweizwei = new Room('3.222', '');
            var zweinulleinsdrei = new Room('2.013', '');
            var dreieinseinsnull = new Room('3.110', '');
            var nullviernulldrei = new Room('0.403', '');

            // Transponder
            var t35 = new Transponder('T35');
            var f06 = new Transponder('F06');
            var h09 = new Transponder('H09');
            var u01 = new Transponder('Universall 1');
            var t58 = new Transponder('58');

            TransponderRelationManager.addLinkBetweenTransponderAndRoom(t35, usabilityStudio);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(t35, dreizweizweizwei);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(t35, zweidreinullzwei);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(f06, kienbaumSaal);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(f06, dreieinsnullsechs);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(h09, einsnulleinisdrei);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(h09, nullviernulldrei);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(t58, zweinulleinsdrei);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(f06, dreieinseinsnull);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(u01, usabilityStudio);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(u01, dreieinsnullsechs);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(u01, kienbaumSaal);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(u01, zweidreinullzwei);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(u01, einsnulleinisdrei);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(u01, dreizweizweizwei);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(u01, zweinulleinsdrei);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(u01, dreieinseinsnull);
            TransponderRelationManager.addLinkBetweenTransponderAndRoom(u01, nullviernulldrei);


            var perDreiEinsNullSechs1 = PermissionFactory.create(f06, studentSvenMueller, new Date('2020-01-01'), userManfredMustermi);
            var perDreiEinsNullSechs2 = PermissionFactory.create(f06, studentTimoMueller, null, userManfredMustermi);
            var perStefanie1 = PermissionFactory.create(t35, studentStefanieStudia, null, null);
            var perStefanie2 = PermissionFactory.create(h09, studentStefanieStudia, null, userManfredMustermi);
            var perStefanie3 = PermissionFactory.create(t58, studentStefanieStudia, null, null);
            var perManfred = PermissionFactory.create(t58, employeeManfredMi, null, null);
            var perKienbaumSaal = PermissionFactory.create(u01, ausleihendeExternHaraldHardWorker, null, userManfredMustermi);
            var perDreiEinsNullSechs3 = PermissionFactory.create(f06, ausleihendeExternHaraldHardWorker, null, userManfredMustermi);
            var perSandraBlue = PermissionFactory.create(h09, studentSandraBlume, new Date('2018-08-01'), userManfredMustermi);

            // Einfache 1:n-/n:1- und n:m-Verknüpfungen müssen vor dem Speichern den Objekten zugewiesen werden,
            // damit beim Speichern diese direkt in den Objekten mitgespeichert werden.
            RoomManagerRelationManager.addLinkBetweenRoomManagerAndRoom(userManfredMustermi, usabilityStudio);
            RoomManagerRelationManager.addLinkBetweenRoomManagerAndRoom(userManfredMustermi, dreieinsnullsechs);
            RoomManagerRelationManager.addLinkBetweenRoomManagerAndRoom(userManfredMustermi, kienbaumSaal);
            RoomManagerRelationManager.addLinkBetweenRoomManagerAndRoom(userManfredMustermi, einsnulleinisdrei);
            RoomManagerRelationManager.addLinkBetweenRoomManagerAndRoom(userManfredMustermi, nullviernulldrei);
            RoomManagerRelationManager.addLinkBetweenRoomManagerAndRoom(userManfredMustermi, dreieinseinsnull);


            PermissionRepository.add(perDreiEinsNullSechs1);
            PermissionRepository.add(perDreiEinsNullSechs2);
            PermissionRepository.add(perStefanie1);
            PermissionRepository.add(perStefanie2);
            PermissionRepository.add(perStefanie3);
            PermissionRepository.add(perManfred);
            PermissionRepository.add(perKienbaumSaal);
            PermissionRepository.add(perDreiEinsNullSechs3);
            PermissionRepository.add(perSandraBlue);

            // Entities
            UserRepository.add(userImmanuelPforte);
            UserRepository.add(userManfredMustermi);

            RoomRepository.add(usabilityStudio);
            RoomRepository.add(dreieinsnullsechs);
            RoomRepository.add(kienbaumSaal);
            RoomRepository.add(zweidreinullzwei);
            RoomRepository.add(einsnulleinisdrei);
            RoomRepository.add(dreizweizweizwei);
            RoomRepository.add(zweinulleinsdrei);
            RoomRepository.add(dreieinseinsnull);
            RoomRepository.add(nullviernulldrei);

            PersonRepository.add(studentStefanieStudia);
            PersonRepository.add(studentSvenMueller);
            PersonRepository.add(studentTimoMueller);
            PersonRepository.add(ausleihendeExternHaraldHardWorker);
            PersonRepository.add(employeeManfredMi);
            PersonRepository.add(studentPeterStudi);
            PersonRepository.add(studentSandraBlume);

            TransponderRepository.add(t35);
            TransponderRepository.add(f06);
            TransponderRepository.add(h09);
            TransponderRepository.add(t58);
            TransponderRepository.add(u01);

            sessionStorage.setItem('isInit', 'true');
        }
    } else {
        alert('Sorry, your browser does not support web storage...');
    }
}