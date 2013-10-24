@echo

set i=1
:head1
md 字国A0%i%
set /a i+=1
IF %i% NEQ 10 goto head1
:head2
md 字国A%i%
set /a i+=1
IF %i% NEQ 19 goto head2
set i=1
:head3
md 字国D0%i%
set /a i+=1
IF %i% NEQ 7 goto head3
