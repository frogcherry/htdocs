@echo

set i=1
:head1
md ����A0%i%
set /a i+=1
IF %i% NEQ 10 goto head1
:head2
md ����A%i%
set /a i+=1
IF %i% NEQ 19 goto head2
set i=1
:head3
md ����D0%i%
set /a i+=1
IF %i% NEQ 7 goto head3
