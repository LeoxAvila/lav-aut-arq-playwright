# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: simulador-credito\flujo2-hipotecario.spec.ts >> Flujo 2: Simulación Crédito HIPOTECARIO VIVIENDA >> crédito hipotecario debe tener tasa diferente al crédito PRECISO
- Location: tests\simulador-credito\flujo2-hipotecario.spec.ts:102:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('iframe.microsite-iframe').contentFrame().getByText('1 año', { exact: true }).first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Pasar al contenido principal" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Menú principal" [ref=e8] [cursor=pointer]:
            - generic [ref=e14]: Menú
          - generic:                                                                            
        - link "Banco Pichincha, página de inicio" [ref=e15] [cursor=pointer]:
          - /url: /
          - img "Banco Pichincha, página de inicio" [ref=e16]
        - generic [ref=e17]:
          - button "Buscar" [ref=e18] [cursor=pointer]:
            - img "Buscar" [ref=e19]
          - link "Abre tu cuenta" [ref=e20] [cursor=pointer]:
            - /url: https://micuenta.pichincha.com/transaccional/autogestion
          - navigation "Menú de cuenta de usuario" [ref=e21]:
            - paragraph [ref=e22]: Menú de cuenta de usuario
            - generic [ref=e23]:
              - button "Acceso clientes" [ref=e24] [cursor=pointer]
              - text: 
    - main [ref=e25]:
      - generic [ref=e26]:
        - navigation "Ruta de exploración" [ref=e29]:
          - list [ref=e30]:
            - listitem [ref=e31]:
              - link "Inicio" [ref=e32] [cursor=pointer]:
                - /url: /
              - text: /
            - listitem [ref=e33]:
              - generic [ref=e34]: Personas
              - text: /
            - listitem [ref=e35]:
              - link "Créditos" [ref=e36] [cursor=pointer]:
                - /url: /detalle-catalogo/personas-prestamos
              - text: /
            - listitem [ref=e37]:
              - generic [ref=e38]: Servicios
              - text: /
            - listitem [ref=e39]:
              - link "Simulador de Crédito" [ref=e40] [cursor=pointer]:
                - /url: /detalle-producto/simulador-de-credito
        - article [ref=e42]:
          - generic [ref=e43]:
            - article [ref=e49]:
              - generic [ref=e51]:
                - generic [ref=e52]:
                  - heading "Simulador de Crédito" [level=1] [ref=e53]
                  - paragraph [ref=e54]: Calcula tu cuota mensual basada en el valor del préstamo que deseas solicitar.
                - img "Simulador de crédito." [ref=e56]
            - generic [ref=e59]:
              - button "Simulador de Crédito" [ref=e61]:
                - paragraph [ref=e62]: Simulador de Crédito
              - navigation "Enlaces de salto al contenido" [ref=e64]:
                - list [ref=e65]:
                  - listitem [ref=e66] [cursor=pointer]:
                    - link "Beneficios" [ref=e67]:
                      - /url: "#beneficios"
                  - listitem [ref=e68] [cursor=pointer]:
                    - link "Preguntas Frecuentes" [ref=e69]:
                      - /url: "#preguntas-frecuentes"
            - paragraph [ref=e77]:
              - iframe [active] [ref=e78]:
                - generic [ref=f10e1]:
                  - generic [ref=f10e4]:
                    - generic [ref=f10e5]:
                      - heading "¿Que crédito necesitas?" [level=2] [ref=f10e7]:
                        - generic: ¿Que crédito necesitas?
                      - generic [ref=f10e12]:
                        - paragraph [ref=f10e15]:
                          - generic: HIPOTECARIO VIVIENDA
                        - generic [ref=f10e17] [cursor=pointer]:
                          - generic: arrow_drop_down
                    - paragraph [ref=f10e19]:
                      - generic: Ingresa los siguientes datos para empezar la simulación
                    - generic [ref=f10e20]:
                      - generic [ref=f10e21]:
                        - generic [ref=f10e23]:
                          - paragraph [ref=f10e26]:
                            - generic: ¿Cuánto cuesta la vivienda ?
                          - generic [ref=f10e27]:
                            - paragraph [ref=f10e29]:
                              - generic: $
                            - generic [ref=f10e30]:
                              - textbox "0" [ref=f10e31]: "80.000"
                              - generic [ref=f10e34]:
                                - generic: check_circle
                          - paragraph [ref=f10e38]:
                            - generic: Min. $3.000,00
                        - generic [ref=f10e40]:
                          - paragraph [ref=f10e43]:
                            - generic: ¿Cuánto dinero necesitas que te prestemos?
                          - generic [ref=f10e44]:
                            - paragraph [ref=f10e46]:
                              - generic: $
                            - generic [ref=f10e47]:
                              - textbox "0" [ref=f10e48]: "10.000"
                              - generic [ref=f10e51]:
                                - generic: check_circle
                          - paragraph [ref=f10e55]:
                            - generic: Min. $3.000,00
                        - generic [ref=f10e57]:
                          - paragraph [ref=f10e60]:
                            - generic: ¿En cuanto tiempo quieres pagarlo?
                          - generic [ref=f10e61]:
                            - generic [ref=f10e62]:
                              - paragraph [ref=f10e64]:
                                - generic: Selecciona un plazo
                              - generic [ref=f10e66] [cursor=pointer]:
                                - generic: arrow_drop_down
                            - list [ref=f10e67]:
                              - listitem [ref=f10e68]:
                                - generic "3 años" [ref=f10e69]:
                                  - paragraph [ref=f10e70]:
                                    - generic: 3 años
                              - listitem [ref=f10e71]:
                                - generic "3 años y 1 mes" [ref=f10e72]:
                                  - paragraph [ref=f10e73]:
                                    - generic: 3 años y 1 mes
                              - listitem [ref=f10e74]:
                                - generic "3 años y 2 meses" [ref=f10e75]:
                                  - paragraph [ref=f10e76]:
                                    - generic: 3 años y 2 meses
                              - listitem [ref=f10e77]:
                                - generic "3 años y 3 meses" [ref=f10e78]:
                                  - paragraph [ref=f10e79]:
                                    - generic: 3 años y 3 meses
                              - listitem [ref=f10e80]:
                                - generic "3 años y 4 meses" [ref=f10e81]:
                                  - paragraph [ref=f10e82]:
                                    - generic: 3 años y 4 meses
                              - listitem [ref=f10e83]:
                                - generic "3 años y 5 meses" [ref=f10e84]:
                                  - paragraph [ref=f10e85]:
                                    - generic: 3 años y 5 meses
                              - listitem [ref=f10e86]:
                                - generic "3 años y 6 meses" [ref=f10e87]:
                                  - paragraph [ref=f10e88]:
                                    - generic: 3 años y 6 meses
                              - listitem [ref=f10e89]:
                                - generic "3 años y 7 meses" [ref=f10e90]:
                                  - paragraph [ref=f10e91]:
                                    - generic: 3 años y 7 meses
                              - listitem [ref=f10e92]:
                                - generic "3 años y 8 meses" [ref=f10e93]:
                                  - paragraph [ref=f10e94]:
                                    - generic: 3 años y 8 meses
                              - listitem [ref=f10e95]:
                                - generic "3 años y 9 meses" [ref=f10e96]:
                                  - paragraph [ref=f10e97]:
                                    - generic: 3 años y 9 meses
                              - listitem [ref=f10e98]:
                                - generic "3 años y 10 meses" [ref=f10e99]:
                                  - paragraph [ref=f10e100]:
                                    - generic: 3 años y 10 meses
                              - listitem [ref=f10e101]:
                                - generic "3 años y 11 meses" [ref=f10e102]:
                                  - paragraph [ref=f10e103]:
                                    - generic: 3 años y 11 meses
                              - listitem [ref=f10e104]:
                                - generic "4 años" [ref=f10e105]:
                                  - paragraph [ref=f10e106]:
                                    - generic: 4 años
                              - listitem [ref=f10e107]:
                                - generic "4 años y 1 mes" [ref=f10e108]:
                                  - paragraph [ref=f10e109]:
                                    - generic: 4 años y 1 mes
                              - listitem [ref=f10e110]:
                                - generic "4 años y 2 meses" [ref=f10e111]:
                                  - paragraph [ref=f10e112]:
                                    - generic: 4 años y 2 meses
                              - listitem [ref=f10e113]:
                                - generic "4 años y 3 meses" [ref=f10e114]:
                                  - paragraph [ref=f10e115]:
                                    - generic: 4 años y 3 meses
                              - listitem [ref=f10e116]:
                                - generic "4 años y 4 meses" [ref=f10e117]:
                                  - paragraph [ref=f10e118]:
                                    - generic: 4 años y 4 meses
                              - listitem [ref=f10e119]:
                                - generic "4 años y 5 meses" [ref=f10e120]:
                                  - paragraph [ref=f10e121]:
                                    - generic: 4 años y 5 meses
                              - listitem [ref=f10e122]:
                                - generic "4 años y 6 meses" [ref=f10e123]:
                                  - paragraph [ref=f10e124]:
                                    - generic: 4 años y 6 meses
                              - listitem [ref=f10e125]:
                                - generic "4 años y 7 meses" [ref=f10e126]:
                                  - paragraph [ref=f10e127]:
                                    - generic: 4 años y 7 meses
                              - listitem [ref=f10e128]:
                                - generic "4 años y 8 meses" [ref=f10e129]:
                                  - paragraph [ref=f10e130]:
                                    - generic: 4 años y 8 meses
                              - listitem [ref=f10e131]:
                                - generic "4 años y 9 meses" [ref=f10e132]:
                                  - paragraph [ref=f10e133]:
                                    - generic: 4 años y 9 meses
                              - listitem [ref=f10e134]:
                                - generic "4 años y 10 meses" [ref=f10e135]:
                                  - paragraph [ref=f10e136]:
                                    - generic: 4 años y 10 meses
                              - listitem [ref=f10e137]:
                                - generic "4 años y 11 meses" [ref=f10e138]:
                                  - paragraph [ref=f10e139]:
                                    - generic: 4 años y 11 meses
                              - listitem [ref=f10e140]:
                                - generic "5 años" [ref=f10e141]:
                                  - paragraph [ref=f10e142]:
                                    - generic: 5 años
                              - listitem [ref=f10e143]:
                                - generic "5 años y 1 mes" [ref=f10e144]:
                                  - paragraph [ref=f10e145]:
                                    - generic: 5 años y 1 mes
                              - listitem [ref=f10e146]:
                                - generic "5 años y 2 meses" [ref=f10e147]:
                                  - paragraph [ref=f10e148]:
                                    - generic: 5 años y 2 meses
                              - listitem [ref=f10e149]:
                                - generic "5 años y 3 meses" [ref=f10e150]:
                                  - paragraph [ref=f10e151]:
                                    - generic: 5 años y 3 meses
                              - listitem [ref=f10e152]:
                                - generic "5 años y 4 meses" [ref=f10e153]:
                                  - paragraph [ref=f10e154]:
                                    - generic: 5 años y 4 meses
                              - listitem [ref=f10e155]:
                                - generic "5 años y 5 meses" [ref=f10e156]:
                                  - paragraph [ref=f10e157]:
                                    - generic: 5 años y 5 meses
                              - listitem [ref=f10e158]:
                                - generic "5 años y 6 meses" [ref=f10e159]:
                                  - paragraph [ref=f10e160]:
                                    - generic: 5 años y 6 meses
                              - listitem [ref=f10e161]:
                                - generic "5 años y 7 meses" [ref=f10e162]:
                                  - paragraph [ref=f10e163]:
                                    - generic: 5 años y 7 meses
                              - listitem [ref=f10e164]:
                                - generic "5 años y 8 meses" [ref=f10e165]:
                                  - paragraph [ref=f10e166]:
                                    - generic: 5 años y 8 meses
                              - listitem [ref=f10e167]:
                                - generic "5 años y 9 meses" [ref=f10e168]:
                                  - paragraph [ref=f10e169]:
                                    - generic: 5 años y 9 meses
                              - listitem [ref=f10e170]:
                                - generic "5 años y 10 meses" [ref=f10e171]:
                                  - paragraph [ref=f10e172]:
                                    - generic: 5 años y 10 meses
                              - listitem [ref=f10e173]:
                                - generic "5 años y 11 meses" [ref=f10e174]:
                                  - paragraph [ref=f10e175]:
                                    - generic: 5 años y 11 meses
                              - listitem [ref=f10e176]:
                                - generic "6 años" [ref=f10e177]:
                                  - paragraph [ref=f10e178]:
                                    - generic: 6 años
                              - listitem [ref=f10e179]:
                                - generic "6 años y 1 mes" [ref=f10e180]:
                                  - paragraph [ref=f10e181]:
                                    - generic: 6 años y 1 mes
                              - listitem [ref=f10e182]:
                                - generic "6 años y 2 meses" [ref=f10e183]:
                                  - paragraph [ref=f10e184]:
                                    - generic: 6 años y 2 meses
                              - listitem [ref=f10e185]:
                                - generic "6 años y 3 meses" [ref=f10e186]:
                                  - paragraph [ref=f10e187]:
                                    - generic: 6 años y 3 meses
                              - listitem [ref=f10e188]:
                                - generic "6 años y 4 meses" [ref=f10e189]:
                                  - paragraph [ref=f10e190]:
                                    - generic: 6 años y 4 meses
                              - listitem [ref=f10e191]:
                                - generic "6 años y 5 meses" [ref=f10e192]:
                                  - paragraph [ref=f10e193]:
                                    - generic: 6 años y 5 meses
                              - listitem [ref=f10e194]:
                                - generic "6 años y 6 meses" [ref=f10e195]:
                                  - paragraph [ref=f10e196]:
                                    - generic: 6 años y 6 meses
                              - listitem [ref=f10e197]:
                                - generic "6 años y 7 meses" [ref=f10e198]:
                                  - paragraph [ref=f10e199]:
                                    - generic: 6 años y 7 meses
                              - listitem [ref=f10e200]:
                                - generic "6 años y 8 meses" [ref=f10e201]:
                                  - paragraph [ref=f10e202]:
                                    - generic: 6 años y 8 meses
                              - listitem [ref=f10e203]:
                                - generic "6 años y 9 meses" [ref=f10e204]:
                                  - paragraph [ref=f10e205]:
                                    - generic: 6 años y 9 meses
                              - listitem [ref=f10e206]:
                                - generic "6 años y 10 meses" [ref=f10e207]:
                                  - paragraph [ref=f10e208]:
                                    - generic: 6 años y 10 meses
                              - listitem [ref=f10e209]:
                                - generic "6 años y 11 meses" [ref=f10e210]:
                                  - paragraph [ref=f10e211]:
                                    - generic: 6 años y 11 meses
                              - listitem [ref=f10e212]:
                                - generic "7 años" [ref=f10e213]:
                                  - paragraph [ref=f10e214]:
                                    - generic: 7 años
                              - listitem [ref=f10e215]:
                                - generic "7 años y 1 mes" [ref=f10e216]:
                                  - paragraph [ref=f10e217]:
                                    - generic: 7 años y 1 mes
                              - listitem [ref=f10e218]:
                                - generic "7 años y 2 meses" [ref=f10e219]:
                                  - paragraph [ref=f10e220]:
                                    - generic: 7 años y 2 meses
                              - listitem [ref=f10e221]:
                                - generic "7 años y 3 meses" [ref=f10e222]:
                                  - paragraph [ref=f10e223]:
                                    - generic: 7 años y 3 meses
                              - listitem [ref=f10e224]:
                                - generic "7 años y 4 meses" [ref=f10e225]:
                                  - paragraph [ref=f10e226]:
                                    - generic: 7 años y 4 meses
                              - listitem [ref=f10e227]:
                                - generic "7 años y 5 meses" [ref=f10e228]:
                                  - paragraph [ref=f10e229]:
                                    - generic: 7 años y 5 meses
                              - listitem [ref=f10e230]:
                                - generic "7 años y 6 meses" [ref=f10e231]:
                                  - paragraph [ref=f10e232]:
                                    - generic: 7 años y 6 meses
                              - listitem [ref=f10e233]:
                                - generic "7 años y 7 meses" [ref=f10e234]:
                                  - paragraph [ref=f10e235]:
                                    - generic: 7 años y 7 meses
                              - listitem [ref=f10e236]:
                                - generic "7 años y 8 meses" [ref=f10e237]:
                                  - paragraph [ref=f10e238]:
                                    - generic: 7 años y 8 meses
                              - listitem [ref=f10e239]:
                                - generic "7 años y 9 meses" [ref=f10e240]:
                                  - paragraph [ref=f10e241]:
                                    - generic: 7 años y 9 meses
                              - listitem [ref=f10e242]:
                                - generic "7 años y 10 meses" [ref=f10e243]:
                                  - paragraph [ref=f10e244]:
                                    - generic: 7 años y 10 meses
                              - listitem [ref=f10e245]:
                                - generic "7 años y 11 meses" [ref=f10e246]:
                                  - paragraph [ref=f10e247]:
                                    - generic: 7 años y 11 meses
                              - listitem [ref=f10e248]:
                                - generic "8 años" [ref=f10e249]:
                                  - paragraph [ref=f10e250]:
                                    - generic: 8 años
                              - listitem [ref=f10e251]:
                                - generic "8 años y 1 mes" [ref=f10e252]:
                                  - paragraph [ref=f10e253]:
                                    - generic: 8 años y 1 mes
                              - listitem [ref=f10e254]:
                                - generic "8 años y 2 meses" [ref=f10e255]:
                                  - paragraph [ref=f10e256]:
                                    - generic: 8 años y 2 meses
                              - listitem [ref=f10e257]:
                                - generic "8 años y 3 meses" [ref=f10e258]:
                                  - paragraph [ref=f10e259]:
                                    - generic: 8 años y 3 meses
                              - listitem [ref=f10e260]:
                                - generic "8 años y 4 meses" [ref=f10e261]:
                                  - paragraph [ref=f10e262]:
                                    - generic: 8 años y 4 meses
                              - listitem [ref=f10e263]:
                                - generic "8 años y 5 meses" [ref=f10e264]:
                                  - paragraph [ref=f10e265]:
                                    - generic: 8 años y 5 meses
                              - listitem [ref=f10e266]:
                                - generic "8 años y 6 meses" [ref=f10e267]:
                                  - paragraph [ref=f10e268]:
                                    - generic: 8 años y 6 meses
                              - listitem [ref=f10e269]:
                                - generic "8 años y 7 meses" [ref=f10e270]:
                                  - paragraph [ref=f10e271]:
                                    - generic: 8 años y 7 meses
                              - listitem [ref=f10e272]:
                                - generic "8 años y 8 meses" [ref=f10e273]:
                                  - paragraph [ref=f10e274]:
                                    - generic: 8 años y 8 meses
                              - listitem [ref=f10e275]:
                                - generic "8 años y 9 meses" [ref=f10e276]:
                                  - paragraph [ref=f10e277]:
                                    - generic: 8 años y 9 meses
                              - listitem [ref=f10e278]:
                                - generic "8 años y 10 meses" [ref=f10e279]:
                                  - paragraph [ref=f10e280]:
                                    - generic: 8 años y 10 meses
                              - listitem [ref=f10e281]:
                                - generic "8 años y 11 meses" [ref=f10e282]:
                                  - paragraph [ref=f10e283]:
                                    - generic: 8 años y 11 meses
                              - listitem [ref=f10e284]:
                                - generic "9 años" [ref=f10e285]:
                                  - paragraph [ref=f10e286]:
                                    - generic: 9 años
                              - listitem [ref=f10e287]:
                                - generic "9 años y 1 mes" [ref=f10e288]:
                                  - paragraph [ref=f10e289]:
                                    - generic: 9 años y 1 mes
                              - listitem [ref=f10e290]:
                                - generic "9 años y 2 meses" [ref=f10e291]:
                                  - paragraph [ref=f10e292]:
                                    - generic: 9 años y 2 meses
                              - listitem [ref=f10e293]:
                                - generic "9 años y 3 meses" [ref=f10e294]:
                                  - paragraph [ref=f10e295]:
                                    - generic: 9 años y 3 meses
                              - listitem [ref=f10e296]:
                                - generic "9 años y 4 meses" [ref=f10e297]:
                                  - paragraph [ref=f10e298]:
                                    - generic: 9 años y 4 meses
                              - listitem [ref=f10e299]:
                                - generic "9 años y 5 meses" [ref=f10e300]:
                                  - paragraph [ref=f10e301]:
                                    - generic: 9 años y 5 meses
                              - listitem [ref=f10e302]:
                                - generic "9 años y 6 meses" [ref=f10e303]:
                                  - paragraph [ref=f10e304]:
                                    - generic: 9 años y 6 meses
                              - listitem [ref=f10e305]:
                                - generic "9 años y 7 meses" [ref=f10e306]:
                                  - paragraph [ref=f10e307]:
                                    - generic: 9 años y 7 meses
                              - listitem [ref=f10e308]:
                                - generic "9 años y 8 meses" [ref=f10e309]:
                                  - paragraph [ref=f10e310]:
                                    - generic: 9 años y 8 meses
                              - listitem [ref=f10e311]:
                                - generic "9 años y 9 meses" [ref=f10e312]:
                                  - paragraph [ref=f10e313]:
                                    - generic: 9 años y 9 meses
                              - listitem [ref=f10e314]:
                                - generic "9 años y 10 meses" [ref=f10e315]:
                                  - paragraph [ref=f10e316]:
                                    - generic: 9 años y 10 meses
                              - listitem [ref=f10e317]:
                                - generic "9 años y 11 meses" [ref=f10e318]:
                                  - paragraph [ref=f10e319]:
                                    - generic: 9 años y 11 meses
                              - listitem [ref=f10e320]:
                                - generic "10 años" [ref=f10e321]:
                                  - paragraph [ref=f10e322]:
                                    - generic: 10 años
                              - listitem [ref=f10e323]:
                                - generic "10 años y 1 mes" [ref=f10e324]:
                                  - paragraph [ref=f10e325]:
                                    - generic: 10 años y 1 mes
                              - listitem [ref=f10e326]:
                                - generic "10 años y 2 meses" [ref=f10e327]:
                                  - paragraph [ref=f10e328]:
                                    - generic: 10 años y 2 meses
                              - listitem [ref=f10e329]:
                                - generic "10 años y 3 meses" [ref=f10e330]:
                                  - paragraph [ref=f10e331]:
                                    - generic: 10 años y 3 meses
                              - listitem [ref=f10e332]:
                                - generic "10 años y 4 meses" [ref=f10e333]:
                                  - paragraph [ref=f10e334]:
                                    - generic: 10 años y 4 meses
                              - listitem [ref=f10e335]:
                                - generic "10 años y 5 meses" [ref=f10e336]:
                                  - paragraph [ref=f10e337]:
                                    - generic: 10 años y 5 meses
                              - listitem [ref=f10e338]:
                                - generic "10 años y 6 meses" [ref=f10e339]:
                                  - paragraph [ref=f10e340]:
                                    - generic: 10 años y 6 meses
                              - listitem [ref=f10e341]:
                                - generic "10 años y 7 meses" [ref=f10e342]:
                                  - paragraph [ref=f10e343]:
                                    - generic: 10 años y 7 meses
                              - listitem [ref=f10e344]:
                                - generic "10 años y 8 meses" [ref=f10e345]:
                                  - paragraph [ref=f10e346]:
                                    - generic: 10 años y 8 meses
                              - listitem [ref=f10e347]:
                                - generic "10 años y 9 meses" [ref=f10e348]:
                                  - paragraph [ref=f10e349]:
                                    - generic: 10 años y 9 meses
                              - listitem [ref=f10e350]:
                                - generic "10 años y 10 meses" [ref=f10e351]:
                                  - paragraph [ref=f10e352]:
                                    - generic: 10 años y 10 meses
                              - listitem [ref=f10e353]:
                                - generic "10 años y 11 meses" [ref=f10e354]:
                                  - paragraph [ref=f10e355]:
                                    - generic: 10 años y 11 meses
                              - listitem [ref=f10e356]:
                                - generic "11 años" [ref=f10e357]:
                                  - paragraph [ref=f10e358]:
                                    - generic: 11 años
                              - listitem [ref=f10e359]:
                                - generic "11 años y 1 mes" [ref=f10e360]:
                                  - paragraph [ref=f10e361]:
                                    - generic: 11 años y 1 mes
                              - listitem [ref=f10e362]:
                                - generic "11 años y 2 meses" [ref=f10e363]:
                                  - paragraph [ref=f10e364]:
                                    - generic: 11 años y 2 meses
                              - listitem [ref=f10e365]:
                                - generic "11 años y 3 meses" [ref=f10e366]:
                                  - paragraph [ref=f10e367]:
                                    - generic: 11 años y 3 meses
                              - listitem [ref=f10e368]:
                                - generic "11 años y 4 meses" [ref=f10e369]:
                                  - paragraph [ref=f10e370]:
                                    - generic: 11 años y 4 meses
                              - listitem [ref=f10e371]:
                                - generic "11 años y 5 meses" [ref=f10e372]:
                                  - paragraph [ref=f10e373]:
                                    - generic: 11 años y 5 meses
                              - listitem [ref=f10e374]:
                                - generic "11 años y 6 meses" [ref=f10e375]:
                                  - paragraph [ref=f10e376]:
                                    - generic: 11 años y 6 meses
                              - listitem [ref=f10e377]:
                                - generic "11 años y 7 meses" [ref=f10e378]:
                                  - paragraph [ref=f10e379]:
                                    - generic: 11 años y 7 meses
                              - listitem [ref=f10e380]:
                                - generic "11 años y 8 meses" [ref=f10e381]:
                                  - paragraph [ref=f10e382]:
                                    - generic: 11 años y 8 meses
                              - listitem [ref=f10e383]:
                                - generic "11 años y 9 meses" [ref=f10e384]:
                                  - paragraph [ref=f10e385]:
                                    - generic: 11 años y 9 meses
                              - listitem [ref=f10e386]:
                                - generic "11 años y 10 meses" [ref=f10e387]:
                                  - paragraph [ref=f10e388]:
                                    - generic: 11 años y 10 meses
                              - listitem [ref=f10e389]:
                                - generic "11 años y 11 meses" [ref=f10e390]:
                                  - paragraph [ref=f10e391]:
                                    - generic: 11 años y 11 meses
                              - listitem [ref=f10e392]:
                                - generic "12 años" [ref=f10e393]:
                                  - paragraph [ref=f10e394]:
                                    - generic: 12 años
                              - listitem [ref=f10e395]:
                                - generic "12 años y 1 mes" [ref=f10e396]:
                                  - paragraph [ref=f10e397]:
                                    - generic: 12 años y 1 mes
                              - listitem [ref=f10e398]:
                                - generic "12 años y 2 meses" [ref=f10e399]:
                                  - paragraph [ref=f10e400]:
                                    - generic: 12 años y 2 meses
                              - listitem [ref=f10e401]:
                                - generic "12 años y 3 meses" [ref=f10e402]:
                                  - paragraph [ref=f10e403]:
                                    - generic: 12 años y 3 meses
                              - listitem [ref=f10e404]:
                                - generic "12 años y 4 meses" [ref=f10e405]:
                                  - paragraph [ref=f10e406]:
                                    - generic: 12 años y 4 meses
                              - listitem [ref=f10e407]:
                                - generic "12 años y 5 meses" [ref=f10e408]:
                                  - paragraph [ref=f10e409]:
                                    - generic: 12 años y 5 meses
                              - listitem [ref=f10e410]:
                                - generic "12 años y 6 meses" [ref=f10e411]:
                                  - paragraph [ref=f10e412]:
                                    - generic: 12 años y 6 meses
                              - listitem [ref=f10e413]:
                                - generic "12 años y 7 meses" [ref=f10e414]:
                                  - paragraph [ref=f10e415]:
                                    - generic: 12 años y 7 meses
                              - listitem [ref=f10e416]:
                                - generic "12 años y 8 meses" [ref=f10e417]:
                                  - paragraph [ref=f10e418]:
                                    - generic: 12 años y 8 meses
                              - listitem [ref=f10e419]:
                                - generic "12 años y 9 meses" [ref=f10e420]:
                                  - paragraph [ref=f10e421]:
                                    - generic: 12 años y 9 meses
                              - listitem [ref=f10e422]:
                                - generic "12 años y 10 meses" [ref=f10e423]:
                                  - paragraph [ref=f10e424]:
                                    - generic: 12 años y 10 meses
                              - listitem [ref=f10e425]:
                                - generic "12 años y 11 meses" [ref=f10e426]:
                                  - paragraph [ref=f10e427]:
                                    - generic: 12 años y 11 meses
                              - listitem [ref=f10e428]:
                                - generic "13 años" [ref=f10e429]:
                                  - paragraph [ref=f10e430]:
                                    - generic: 13 años
                              - listitem [ref=f10e431]:
                                - generic "13 años y 1 mes" [ref=f10e432]:
                                  - paragraph [ref=f10e433]:
                                    - generic: 13 años y 1 mes
                              - listitem [ref=f10e434]:
                                - generic "13 años y 2 meses" [ref=f10e435]:
                                  - paragraph [ref=f10e436]:
                                    - generic: 13 años y 2 meses
                              - listitem [ref=f10e437]:
                                - generic "13 años y 3 meses" [ref=f10e438]:
                                  - paragraph [ref=f10e439]:
                                    - generic: 13 años y 3 meses
                              - listitem [ref=f10e440]:
                                - generic "13 años y 4 meses" [ref=f10e441]:
                                  - paragraph [ref=f10e442]:
                                    - generic: 13 años y 4 meses
                              - listitem [ref=f10e443]:
                                - generic "13 años y 5 meses" [ref=f10e444]:
                                  - paragraph [ref=f10e445]:
                                    - generic: 13 años y 5 meses
                              - listitem [ref=f10e446]:
                                - generic "13 años y 6 meses" [ref=f10e447]:
                                  - paragraph [ref=f10e448]:
                                    - generic: 13 años y 6 meses
                              - listitem [ref=f10e449]:
                                - generic "13 años y 7 meses" [ref=f10e450]:
                                  - paragraph [ref=f10e451]:
                                    - generic: 13 años y 7 meses
                              - listitem [ref=f10e452]:
                                - generic "13 años y 8 meses" [ref=f10e453]:
                                  - paragraph [ref=f10e454]:
                                    - generic: 13 años y 8 meses
                              - listitem [ref=f10e455]:
                                - generic "13 años y 9 meses" [ref=f10e456]:
                                  - paragraph [ref=f10e457]:
                                    - generic: 13 años y 9 meses
                              - listitem [ref=f10e458]:
                                - generic "13 años y 10 meses" [ref=f10e459]:
                                  - paragraph [ref=f10e460]:
                                    - generic: 13 años y 10 meses
                              - listitem [ref=f10e461]:
                                - generic "13 años y 11 meses" [ref=f10e462]:
                                  - paragraph [ref=f10e463]:
                                    - generic: 13 años y 11 meses
                              - listitem [ref=f10e464]:
                                - generic "14 años" [ref=f10e465]:
                                  - paragraph [ref=f10e466]:
                                    - generic: 14 años
                              - listitem [ref=f10e467]:
                                - generic "14 años y 1 mes" [ref=f10e468]:
                                  - paragraph [ref=f10e469]:
                                    - generic: 14 años y 1 mes
                              - listitem [ref=f10e470]:
                                - generic "14 años y 2 meses" [ref=f10e471]:
                                  - paragraph [ref=f10e472]:
                                    - generic: 14 años y 2 meses
                              - listitem [ref=f10e473]:
                                - generic "14 años y 3 meses" [ref=f10e474]:
                                  - paragraph [ref=f10e475]:
                                    - generic: 14 años y 3 meses
                              - listitem [ref=f10e476]:
                                - generic "14 años y 4 meses" [ref=f10e477]:
                                  - paragraph [ref=f10e478]:
                                    - generic: 14 años y 4 meses
                              - listitem [ref=f10e479]:
                                - generic "14 años y 5 meses" [ref=f10e480]:
                                  - paragraph [ref=f10e481]:
                                    - generic: 14 años y 5 meses
                              - listitem [ref=f10e482]:
                                - generic "14 años y 6 meses" [ref=f10e483]:
                                  - paragraph [ref=f10e484]:
                                    - generic: 14 años y 6 meses
                              - listitem [ref=f10e485]:
                                - generic "14 años y 7 meses" [ref=f10e486]:
                                  - paragraph [ref=f10e487]:
                                    - generic: 14 años y 7 meses
                              - listitem [ref=f10e488]:
                                - generic "14 años y 8 meses" [ref=f10e489]:
                                  - paragraph [ref=f10e490]:
                                    - generic: 14 años y 8 meses
                              - listitem [ref=f10e491]:
                                - generic "14 años y 9 meses" [ref=f10e492]:
                                  - paragraph [ref=f10e493]:
                                    - generic: 14 años y 9 meses
                              - listitem [ref=f10e494]:
                                - generic "14 años y 10 meses" [ref=f10e495]:
                                  - paragraph [ref=f10e496]:
                                    - generic: 14 años y 10 meses
                              - listitem [ref=f10e497]:
                                - generic "14 años y 11 meses" [ref=f10e498]:
                                  - paragraph [ref=f10e499]:
                                    - generic: 14 años y 11 meses
                              - listitem [ref=f10e500]:
                                - generic "15 años" [ref=f10e501]:
                                  - paragraph [ref=f10e502]:
                                    - generic: 15 años
                              - listitem [ref=f10e503]:
                                - generic "15 años y 1 mes" [ref=f10e504]:
                                  - paragraph [ref=f10e505]:
                                    - generic: 15 años y 1 mes
                              - listitem [ref=f10e506]:
                                - generic "15 años y 2 meses" [ref=f10e507]:
                                  - paragraph [ref=f10e508]:
                                    - generic: 15 años y 2 meses
                              - listitem [ref=f10e509]:
                                - generic "15 años y 3 meses" [ref=f10e510]:
                                  - paragraph [ref=f10e511]:
                                    - generic: 15 años y 3 meses
                              - listitem [ref=f10e512]:
                                - generic "15 años y 4 meses" [ref=f10e513]:
                                  - paragraph [ref=f10e514]:
                                    - generic: 15 años y 4 meses
                              - listitem [ref=f10e515]:
                                - generic "15 años y 5 meses" [ref=f10e516]:
                                  - paragraph [ref=f10e517]:
                                    - generic: 15 años y 5 meses
                              - listitem [ref=f10e518]:
                                - generic "15 años y 6 meses" [ref=f10e519]:
                                  - paragraph [ref=f10e520]:
                                    - generic: 15 años y 6 meses
                              - listitem [ref=f10e521]:
                                - generic "15 años y 7 meses" [ref=f10e522]:
                                  - paragraph [ref=f10e523]:
                                    - generic: 15 años y 7 meses
                              - listitem [ref=f10e524]:
                                - generic "15 años y 8 meses" [ref=f10e525]:
                                  - paragraph [ref=f10e526]:
                                    - generic: 15 años y 8 meses
                              - listitem [ref=f10e527]:
                                - generic "15 años y 9 meses" [ref=f10e528]:
                                  - paragraph [ref=f10e529]:
                                    - generic: 15 años y 9 meses
                              - listitem [ref=f10e530]:
                                - generic "15 años y 10 meses" [ref=f10e531]:
                                  - paragraph [ref=f10e532]:
                                    - generic: 15 años y 10 meses
                              - listitem [ref=f10e533]:
                                - generic "15 años y 11 meses" [ref=f10e534]:
                                  - paragraph [ref=f10e535]:
                                    - generic: 15 años y 11 meses
                              - listitem [ref=f10e536]:
                                - generic "16 años" [ref=f10e537]:
                                  - paragraph [ref=f10e538]:
                                    - generic: 16 años
                              - listitem [ref=f10e539]:
                                - generic "16 años y 1 mes" [ref=f10e540]:
                                  - paragraph [ref=f10e541]:
                                    - generic: 16 años y 1 mes
                              - listitem [ref=f10e542]:
                                - generic "16 años y 2 meses" [ref=f10e543]:
                                  - paragraph [ref=f10e544]:
                                    - generic: 16 años y 2 meses
                              - listitem [ref=f10e545]:
                                - generic "16 años y 3 meses" [ref=f10e546]:
                                  - paragraph [ref=f10e547]:
                                    - generic: 16 años y 3 meses
                              - listitem [ref=f10e548]:
                                - generic "16 años y 4 meses" [ref=f10e549]:
                                  - paragraph [ref=f10e550]:
                                    - generic: 16 años y 4 meses
                              - listitem [ref=f10e551]:
                                - generic "16 años y 5 meses" [ref=f10e552]:
                                  - paragraph [ref=f10e553]:
                                    - generic: 16 años y 5 meses
                              - listitem [ref=f10e554]:
                                - generic "16 años y 6 meses" [ref=f10e555]:
                                  - paragraph [ref=f10e556]:
                                    - generic: 16 años y 6 meses
                              - listitem [ref=f10e557]:
                                - generic "16 años y 7 meses" [ref=f10e558]:
                                  - paragraph [ref=f10e559]:
                                    - generic: 16 años y 7 meses
                              - listitem [ref=f10e560]:
                                - generic "16 años y 8 meses" [ref=f10e561]:
                                  - paragraph [ref=f10e562]:
                                    - generic: 16 años y 8 meses
                              - listitem [ref=f10e563]:
                                - generic "16 años y 9 meses" [ref=f10e564]:
                                  - paragraph [ref=f10e565]:
                                    - generic: 16 años y 9 meses
                              - listitem [ref=f10e566]:
                                - generic "16 años y 10 meses" [ref=f10e567]:
                                  - paragraph [ref=f10e568]:
                                    - generic: 16 años y 10 meses
                              - listitem [ref=f10e569]:
                                - generic "16 años y 11 meses" [ref=f10e570]:
                                  - paragraph [ref=f10e571]:
                                    - generic: 16 años y 11 meses
                              - listitem [ref=f10e572]:
                                - generic "17 años" [ref=f10e573]:
                                  - paragraph [ref=f10e574]:
                                    - generic: 17 años
                              - listitem [ref=f10e575]:
                                - generic "17 años y 1 mes" [ref=f10e576]:
                                  - paragraph [ref=f10e577]:
                                    - generic: 17 años y 1 mes
                              - listitem [ref=f10e578]:
                                - generic "17 años y 2 meses" [ref=f10e579]:
                                  - paragraph [ref=f10e580]:
                                    - generic: 17 años y 2 meses
                              - listitem [ref=f10e581]:
                                - generic "17 años y 3 meses" [ref=f10e582]:
                                  - paragraph [ref=f10e583]:
                                    - generic: 17 años y 3 meses
                              - listitem [ref=f10e584]:
                                - generic "17 años y 4 meses" [ref=f10e585]:
                                  - paragraph [ref=f10e586]:
                                    - generic: 17 años y 4 meses
                              - listitem [ref=f10e587]:
                                - generic "17 años y 5 meses" [ref=f10e588]:
                                  - paragraph [ref=f10e589]:
                                    - generic: 17 años y 5 meses
                              - listitem [ref=f10e590]:
                                - generic "17 años y 6 meses" [ref=f10e591]:
                                  - paragraph [ref=f10e592]:
                                    - generic: 17 años y 6 meses
                              - listitem [ref=f10e593]:
                                - generic "17 años y 7 meses" [ref=f10e594]:
                                  - paragraph [ref=f10e595]:
                                    - generic: 17 años y 7 meses
                              - listitem [ref=f10e596]:
                                - generic "17 años y 8 meses" [ref=f10e597]:
                                  - paragraph [ref=f10e598]:
                                    - generic: 17 años y 8 meses
                              - listitem [ref=f10e599]:
                                - generic "17 años y 9 meses" [ref=f10e600]:
                                  - paragraph [ref=f10e601]:
                                    - generic: 17 años y 9 meses
                              - listitem [ref=f10e602]:
                                - generic "17 años y 10 meses" [ref=f10e603]:
                                  - paragraph [ref=f10e604]:
                                    - generic: 17 años y 10 meses
                              - listitem [ref=f10e605]:
                                - generic "17 años y 11 meses" [ref=f10e606]:
                                  - paragraph [ref=f10e607]:
                                    - generic: 17 años y 11 meses
                              - listitem [ref=f10e608]:
                                - generic "18 años" [ref=f10e609]:
                                  - paragraph [ref=f10e610]:
                                    - generic: 18 años
                              - listitem [ref=f10e611]:
                                - generic "18 años y 1 mes" [ref=f10e612]:
                                  - paragraph [ref=f10e613]:
                                    - generic: 18 años y 1 mes
                              - listitem [ref=f10e614]:
                                - generic "18 años y 2 meses" [ref=f10e615]:
                                  - paragraph [ref=f10e616]:
                                    - generic: 18 años y 2 meses
                              - listitem [ref=f10e617]:
                                - generic "18 años y 3 meses" [ref=f10e618]:
                                  - paragraph [ref=f10e619]:
                                    - generic: 18 años y 3 meses
                              - listitem [ref=f10e620]:
                                - generic "18 años y 4 meses" [ref=f10e621]:
                                  - paragraph [ref=f10e622]:
                                    - generic: 18 años y 4 meses
                              - listitem [ref=f10e623]:
                                - generic "18 años y 5 meses" [ref=f10e624]:
                                  - paragraph [ref=f10e625]:
                                    - generic: 18 años y 5 meses
                              - listitem [ref=f10e626]:
                                - generic "18 años y 6 meses" [ref=f10e627]:
                                  - paragraph [ref=f10e628]:
                                    - generic: 18 años y 6 meses
                              - listitem [ref=f10e629]:
                                - generic "18 años y 7 meses" [ref=f10e630]:
                                  - paragraph [ref=f10e631]:
                                    - generic: 18 años y 7 meses
                              - listitem [ref=f10e632]:
                                - generic "18 años y 8 meses" [ref=f10e633]:
                                  - paragraph [ref=f10e634]:
                                    - generic: 18 años y 8 meses
                              - listitem [ref=f10e635]:
                                - generic "18 años y 9 meses" [ref=f10e636]:
                                  - paragraph [ref=f10e637]:
                                    - generic: 18 años y 9 meses
                              - listitem [ref=f10e638]:
                                - generic "18 años y 10 meses" [ref=f10e639]:
                                  - paragraph [ref=f10e640]:
                                    - generic: 18 años y 10 meses
                              - listitem [ref=f10e641]:
                                - generic "18 años y 11 meses" [ref=f10e642]:
                                  - paragraph [ref=f10e643]:
                                    - generic: 18 años y 11 meses
                              - listitem [ref=f10e644]:
                                - generic "19 años" [ref=f10e645]:
                                  - paragraph [ref=f10e646]:
                                    - generic: 19 años
                              - listitem [ref=f10e647]:
                                - generic "19 años y 1 mes" [ref=f10e648]:
                                  - paragraph [ref=f10e649]:
                                    - generic: 19 años y 1 mes
                              - listitem [ref=f10e650]:
                                - generic "19 años y 2 meses" [ref=f10e651]:
                                  - paragraph [ref=f10e652]:
                                    - generic: 19 años y 2 meses
                              - listitem [ref=f10e653]:
                                - generic "19 años y 3 meses" [ref=f10e654]:
                                  - paragraph [ref=f10e655]:
                                    - generic: 19 años y 3 meses
                              - listitem [ref=f10e656]:
                                - generic "19 años y 4 meses" [ref=f10e657]:
                                  - paragraph [ref=f10e658]:
                                    - generic: 19 años y 4 meses
                              - listitem [ref=f10e659]:
                                - generic "19 años y 5 meses" [ref=f10e660]:
                                  - paragraph [ref=f10e661]:
                                    - generic: 19 años y 5 meses
                              - listitem [ref=f10e662]:
                                - generic "19 años y 6 meses" [ref=f10e663]:
                                  - paragraph [ref=f10e664]:
                                    - generic: 19 años y 6 meses
                              - listitem [ref=f10e665]:
                                - generic "19 años y 7 meses" [ref=f10e666]:
                                  - paragraph [ref=f10e667]:
                                    - generic: 19 años y 7 meses
                              - listitem [ref=f10e668]:
                                - generic "19 años y 8 meses" [ref=f10e669]:
                                  - paragraph [ref=f10e670]:
                                    - generic: 19 años y 8 meses
                              - listitem [ref=f10e671]:
                                - generic "19 años y 9 meses" [ref=f10e672]:
                                  - paragraph [ref=f10e673]:
                                    - generic: 19 años y 9 meses
                              - listitem [ref=f10e674]:
                                - generic "19 años y 10 meses" [ref=f10e675]:
                                  - paragraph [ref=f10e676]:
                                    - generic: 19 años y 10 meses
                              - listitem [ref=f10e677]:
                                - generic "19 años y 11 meses" [ref=f10e678]:
                                  - paragraph [ref=f10e679]:
                                    - generic: 19 años y 11 meses
                              - listitem [ref=f10e680]:
                                - generic "20 años" [ref=f10e681]:
                                  - paragraph [ref=f10e682]:
                                    - generic: 20 años
                        - generic [ref=f10e684]:
                          - paragraph [ref=f10e686]:
                            - generic: ¿Como quieres pagar tus intereses?
                          - generic [ref=f10e687]:
                            - generic [ref=f10e688] [cursor=pointer]:
                              - radio "Método Francés Cuotas se mantienen fijas en el tiempo"
                              - paragraph [ref=f10e690]:
                                - generic: Método Francés
                              - paragraph [ref=f10e692]:
                                - generic: Cuotas se mantienen fijas en el tiempo
                            - generic [ref=f10e693] [cursor=pointer]:
                              - radio "Método Alemán Cuotas variables que decrecen en el tiempo"
                              - paragraph [ref=f10e695]:
                                - generic: Método Alemán
                              - paragraph [ref=f10e697]:
                                - generic: Cuotas variables que decrecen en el tiempo
                        - button "Simular" [disabled] [ref=f10e699]:
                          - generic:
                            - paragraph:
                              - generic: Simular
                      - generic [ref=f10e702]:
                        - generic [ref=f10e703]:
                          - paragraph [ref=f10e705]:
                            - generic: Tus pagos mensuales serán
                          - generic [ref=f10e706]:
                            - generic [ref=f10e707]:
                              - generic [ref=f10e708]:
                                - paragraph [ref=f10e709]:
                                  - generic: $0
                                - paragraph [ref=f10e710]:
                                  - generic: Capital
                              - paragraph [ref=f10e712]:
                                - generic: +
                              - generic [ref=f10e713]:
                                - paragraph [ref=f10e714]:
                                  - generic: $0
                                - paragraph [ref=f10e715]:
                                  - generic: Interés
                              - paragraph [ref=f10e717]:
                                - generic: +
                              - generic [ref=f10e718]:
                                - paragraph [ref=f10e719]:
                                  - generic: $0
                                - paragraph [ref=f10e720]:
                                  - generic: Seguro
                            - paragraph [ref=f10e723]:
                              - generic: $0
                            - generic [ref=f10e724]:
                              - paragraph [ref=f10e726]:
                                - generic:
                                  - text: Durante
                                  - strong [ref=f10e727]: "0"
                              - paragraph [ref=f10e729]:
                                - generic:
                                  - text: Con una tasa de interés referencial
                                  - strong [ref=f10e730]: 0%
                        - generic [ref=f10e731]:
                          - paragraph [ref=f10e733]:
                            - generic: Detalle de tu crédito
                          - generic [ref=f10e734]:
                            - generic [ref=f10e735]:
                              - paragraph [ref=f10e737]:
                                - generic: "Capital:"
                              - paragraph [ref=f10e739]:
                                - generic: $0
                            - generic [ref=f10e740]:
                              - paragraph [ref=f10e742]:
                                - generic: "Total de interés:"
                              - paragraph [ref=f10e744]:
                                - generic: $0
                            - generic [ref=f10e745]:
                              - paragraph [ref=f10e747]:
                                - generic: "Total seguro de desgravamen:"
                              - paragraph [ref=f10e749]:
                                - generic: $0
                          - generic [ref=f10e751]:
                            - paragraph [ref=f10e753]:
                              - generic: "Total a pagar:"
                            - paragraph [ref=f10e755]:
                              - generic: $0
                        - paragraph [ref=f10e757]:
                          - generic: "*Valores referenciales, no son considerados como una oferta formal de préstamo.La oferta definitiva está sujeta al cumplimiento de las condiciones y políticas referentes a capacidad de pago."
                        - generic [ref=f10e758]:
                          - text: Ver tabla de amortización
                          - button "Ver tabla de amortización" [ref=f10e759]:
                            - paragraph [ref=f10e762]:
                              - generic: Ver tabla de amortización
                    - generic:
                      - generic: Tabla de amortización
                      - generic: "Producto:"
                      - generic: "Plazo (meses):"
                      - generic: "Tasa de interés nominal:"
                      - generic: "Tasa de interes efectiva anual:"
                      - generic: "Capital:"
                      - generic: "Total de interés:"
                      - generic: "Total seguro de desgravamen:"
                      - generic: Cuotas
                      - generic: Fecha de pago
                      - generic: Capital
                      - generic: Interés
                      - generic: Seguros desg.
                      - generic: Seguro Incendios/Vehiculo
                      - generic: Valor cuota
                      - generic: Saldo
                  - iframe [ref=f10e766]:
                    - generic [ref=f12e6]:
                      - text: protegido por
                      - strong [ref=f12e7]: reCAPTCHA
            - article [ref=e84]:
              - generic [ref=e85]:
                - paragraph [ref=e86]: Beneficios
                - heading "Descubre las ventajas de nuestros créditos." [level=2] [ref=e87]
                - paragraph [ref=e89]: Explora los beneficios que tenemos para ti y así cubrir tus necesidades financieras.
              - list [ref=e90]:
                - listitem [ref=e91]:
                  - article [ref=e93]:
                    - generic [ref=e97]:
                      - generic [ref=e98]: Imagen
                      - img [ref=e100]
                    - paragraph [ref=e101]: Flexibilidad en monto y plazo
                - listitem [ref=e102]:
                  - article [ref=e104]:
                    - generic [ref=e108]:
                      - generic [ref=e109]: Imagen
                      - img [ref=e111]
                    - paragraph [ref=e112]: Tasas competitivas
                - listitem [ref=e113]:
                  - article [ref=e115]:
                    - generic [ref=e119]:
                      - generic [ref=e120]: Imagen
                      - img [ref=e122]
                    - paragraph [ref=e123]: Créditos rápidos y efectivos
            - article [ref=e129]:
              - generic [ref=e130]:
                - heading "Preguntas frecuentes" [level=2] [ref=e133]
                - generic [ref=e135]:
                  - tablist
                  - tabpanel "N/A" [ref=e137]:
                    - generic [ref=e138]:
                      - heading "¿Para qué sirve el simulador?" [level=3] [ref=e140]:
                        - button "¿Para qué sirve el simulador?" [ref=e141] [cursor=pointer]
                      - heading "¿Los valores son los finales?" [level=3] [ref=e143]:
                        - button "¿Los valores son los finales?" [ref=e144] [cursor=pointer]
                      - heading "¿Puedo simular más de una vez?" [level=3] [ref=e146]:
                        - button "¿Puedo simular más de una vez?" [ref=e147] [cursor=pointer]
    - contentinfo [ref=e148]:
      - generic [ref=e149]:
        - generic [ref=e150]:
          - img "Banco Pichincha" [ref=e152]: ">"
          - generic [ref=e156]:
            - navigation "Menú de contacto del pie de página" [ref=e159]:
              - paragraph [ref=e160]: Menú de contacto del pie de página
              - list [ref=e161]:
                - listitem [ref=e162]:
                  - generic [ref=e163]: Contacto y ayuda
                  - list [ref=e165]:
                    - listitem [ref=e166]:
                      - link " Centro de ayuda" [ref=e167] [cursor=pointer]:
                        - /url: https://soporte.pichincha.com/hc/es-419/
                      - paragraph [ref=e170]: Consultas
                    - listitem [ref=e171]:
                      - link " Encuentra tu Banco" [ref=e172] [cursor=pointer]:
                        - /url: https://www.pichincha.com/mapa
                      - paragraph [ref=e175]: Mapa
                    - listitem [ref=e176]:
                      - link " (02) 2999 999" [ref=e177] [cursor=pointer]:
                        - /url: tel:+593 22999 999
                      - paragraph [ref=e180]: Banca telefónica
                    - listitem [ref=e181]:
                      - link " 096 299 2999" [ref=e182] [cursor=pointer]:
                        - /url: https://api.whatsapp.com/send/?phone=593962992999&text=&type=phone_number&app_absent=0
                      - paragraph [ref=e185]: WhatsApp
                - listitem [ref=e186]:
                  - link "Sugerencias y reclamos" [ref=e187] [cursor=pointer]:
                    - /url: /sugerencias-y-reclamos
            - navigation "Pie de página" [ref=e190]:
              - paragraph [ref=e191]: Pie de página
              - list [ref=e192]:
                - listitem [ref=e193]:
                  - generic [ref=e194]: Canales de atención
                  - list [ref=e195]:
                    - listitem [ref=e196]:
                      - link "Banca Web" [ref=e197] [cursor=pointer]:
                        - /url: /banca-web
                    - listitem [ref=e198]:
                      - link "Banca Móvil" [ref=e199] [cursor=pointer]:
                        - /url: /banca-movil
                    - listitem [ref=e200]:
                      - link "Mi Vecino" [ref=e201] [cursor=pointer]:
                        - /url: /mi-vecino
                    - listitem [ref=e202]:
                      - link "Deuna!" [ref=e203] [cursor=pointer]:
                        - /url: /deuna
                    - listitem [ref=e204]:
                      - link "Ver todos" [ref=e205] [cursor=pointer]:
                        - /url: /detalle-catalogo/personas-servicios
                - listitem [ref=e206]:
                  - generic [ref=e207]: Para tu interés
                  - list [ref=e208]:
                    - listitem [ref=e209]:
                      - link "Crédito de consumo" [ref=e210] [cursor=pointer]:
                        - /url: /detalle-producto/personas-prestamo-linea-abierta
                    - listitem [ref=e211]:
                      - link "Crédito hipotecario" [ref=e212] [cursor=pointer]:
                        - /url: /detalle-producto/personas-credito-hipotecario-de-vivienda
                    - listitem [ref=e213]:
                      - link "Cuenta de ahorro flexible" [ref=e214] [cursor=pointer]:
                        - /url: /detalle-producto/personas-cuentas-ahorro-flexible
                    - listitem [ref=e215]:
                      - link "Depósito a plazo" [ref=e216] [cursor=pointer]:
                        - /url: /detalle-producto/personas-inversiones-plazodolar
                    - listitem [ref=e217]:
                      - link "Venta de bienes" [ref=e218] [cursor=pointer]:
                        - /url: https://www.pichincha.com/sites/default/files/documents/2026-04/bienes-a-la-venta-abril-2026.pdf
                    - listitem [ref=e219]:
                      - link "Programa Beta Testers" [ref=e220] [cursor=pointer]:
                        - /url: /betatesters
                    - listitem [ref=e221]:
                      - link "Tips de seguridad" [ref=e222] [cursor=pointer]:
                        - /url: /catalogo-seguridad
                - listitem [ref=e223]:
                  - generic [ref=e224]: Sobre nosotros
                  - list [ref=e225]:
                    - listitem [ref=e226]:
                      - link "Tasas y tarifas" [ref=e227] [cursor=pointer]:
                        - /url: /transparencia
                    - listitem [ref=e228]:
                      - link "Trabaja con nosotros" [ref=e229] [cursor=pointer]:
                        - /url: https://vacantes.pichincha.com/
                    - listitem [ref=e230]:
                      - link "¿Quiénes somos?" [ref=e231] [cursor=pointer]:
                        - /url: /catalogo-conoce-tu-banco
                    - listitem [ref=e232]:
                      - link "Lo que ofrecemos" [ref=e233] [cursor=pointer]:
                        - /url: /lo-que-ofrecemos
                    - listitem [ref=e234]:
                      - link "Transparencia" [ref=e235] [cursor=pointer]:
                        - /url: /transparencia
                    - listitem [ref=e236]:
                      - link "Desarrollo sostenible" [ref=e237] [cursor=pointer]:
                        - /url: /catalogo-desarrollo-sostenible
        - generic [ref=e238]:
          - generic [ref=e239]:
            - navigation "Menú de redes sociales del pie de página" [ref=e242]:
              - paragraph [ref=e243]: Menú de redes sociales del pie de página
              - list [ref=e244]:
                - listitem [ref=e245]:
                  - link "Instagram" [ref=e246] [cursor=pointer]:
                    - /url: https://www.instagram.com/bancopichincha/
                - listitem [ref=e247]:
                  - link "Facebook" [ref=e248] [cursor=pointer]:
                    - /url: https://www.facebook.com/BancoPichinchaEcuador/
                - listitem [ref=e249]:
                  - link "X" [ref=e250] [cursor=pointer]:
                    - /url: https://twitter.com/BancoPichincha
                - listitem [ref=e251]:
                  - link "Youtube" [ref=e252] [cursor=pointer]:
                    - /url: https://www.youtube.com/user/BancoPichinchaCA
                - listitem [ref=e253]:
                  - link "Linkedin" [ref=e254] [cursor=pointer]:
                    - /url: https://www.linkedin.com/company/banco-pichincha-ca
                - listitem [ref=e255]:
                  - link "Tiktok" [ref=e256] [cursor=pointer]:
                    - /url: https://www.tiktok.com/@bancopichincha
            - navigation "Legal" [ref=e259]:
              - paragraph [ref=e260]: Legal
              - list [ref=e261]:
                - listitem [ref=e262]:
                  - link "Legal" [ref=e263] [cursor=pointer]:
                    - /url: /informacion-legal
          - navigation "Apps" [ref=e266]:
            - paragraph [ref=e267]: Apps
            - list [ref=e268]:
              - listitem [ref=e269]:
                - generic [ref=e270]: Pichincha Banca Móvil
                - generic [ref=e271]:
                  - list [ref=e272]:
                    - listitem [ref=e273]:
                      - link "App store" [ref=e274] [cursor=pointer]:
                        - /url: https://apps.apple.com/ec/app/pichincha-banca-movil/id999191728?mt=8
                      - paragraph [ref=e277]:
                        - img [ref=e278]
                    - listitem [ref=e279]:
                      - link "Play Store" [ref=e280] [cursor=pointer]:
                        - /url: https://play.google.com/store/apps/details?id=com.yellowpepper.pichincha&hl=en_US
                      - paragraph [ref=e283]:
                        - img [ref=e284]
                    - listitem [ref=e285]:
                      - link "App gallery" [ref=e286] [cursor=pointer]:
                        - /url: https://consumer.huawei.com/latin/mobileservices/appgallery/
                      - paragraph [ref=e289]:
                        - img [ref=e290]
                  - paragraph [ref=e292]: Descarga nuestra aplicación
  - img [ref=e294]
  - generic:
    - img "taptapdigital" [ref=e295]
    - img "taptapdigital" [ref=e296]
    - img "taptapdigital" [ref=e297]
    - img "taptapdigital" [ref=e298]
```

# Test source

```ts
  1   | import { Page } from '@playwright/test';
  2   | import { SimuladorPage } from '../pages/SimuladorPage';
  3   | 
  4   | /**
  5   |  * Actions for the Credit Simulator.
  6   |  * Contains all reusable interactions with the simulator form and results.
  7   |  * Depends on SimuladorPage for locators — SimuladorPage itself stays as a pure element map.
  8   |  */
  9   | export class SimuladorActions {
  10  |   constructor(
  11  |     private readonly page: Page,
  12  |     private readonly simuladorPage: SimuladorPage,
  13  |   ) {}
  14  | 
  15  |   async navigateToSimulador(): Promise<void> {
  16  |     await this.simuladorPage.navigate(this.simuladorPage.url);
  17  |     await this.simuladorPage.waitForPageLoad();
  18  |     await this.page.waitForSelector('iframe.microsite-iframe', { timeout: 20_000 });
  19  |     await this.simuladorPage.creditTypeDropdown().waitFor({ timeout: 30_000 });
  20  |   }
  21  | 
  22  |   async getTitle(): Promise<string> {
  23  |     return await this.page.title();
  24  |   }
  25  | 
  26  |   async seleccionarTipoCredito(tipo: string): Promise<void> {
  27  |     await this.page.evaluate(() => window.scrollTo(0, 0));
  28  |     await this.simuladorPage.creditTypeDropdown().click();
  29  |     await this.page.waitForTimeout(600);
  30  |     await this.simuladorPage.frameLocator.getByText(tipo, { exact: true }).first().click({ force: true });
  31  |     await this.page.waitForTimeout(1500);
  32  |   }
  33  | 
  34  |   async ingresarMontoCredito(monto: number): Promise<void> {
  35  |     await this.simuladorPage.loanValueInput().fill(String(monto));
  36  |     await this.page.waitForTimeout(500);
  37  |   }
  38  | 
  39  |   async ingresarMontoVivienda(monto: number): Promise<void> {
  40  |     await this.simuladorPage.assetValueInput().fill(String(monto));
  41  |     await this.page.waitForTimeout(500);
  42  |   }
  43  | 
  44  |   async seleccionarPlazo(opcion: string): Promise<void> {
  45  |     await this.simuladorPage.loanTermDropdown().click();
> 46  |     await this.simuladorPage.frameLocator.getByText(opcion, { exact: true }).first().click();
      |                                                                                      ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  47  |     await this.page.waitForTimeout(500);
  48  |   }
  49  | 
  50  |   async seleccionarMetodoFrances(): Promise<void> {
  51  |     await this.simuladorPage.metodeFrancesLabel().click();
  52  |     await this.page.waitForTimeout(300);
  53  |   }
  54  | 
  55  |   async seleccionarMetodoAleman(): Promise<void> {
  56  |     await this.simuladorPage.metodeAlemanLabel().click();
  57  |     await this.page.waitForTimeout(300);
  58  |   }
  59  | 
  60  |   async simular(): Promise<void> {
  61  |     await this.simuladorPage.btnSimular().click();
  62  |     const frame = await this.simuladorPage.getFrame();
  63  |     await frame.waitForFunction(() => {
  64  |       const elements = Array.from(document.querySelectorAll('pichincha-typography')) as HTMLElement[];
  65  |       return elements.some(el => /^\$[1-9][0-9.,]*,[0-9]+$/.test((el.innerText || '').trim()));
  66  |     }, { timeout: 20_000 });
  67  |   }
  68  | 
  69  |   async abrirTablaAmortizacion(): Promise<void> {
  70  |     await this.simuladorPage.btnVerTablaAmortizacion().waitFor({ state: 'visible', timeout: 10_000 });
  71  |     await this.simuladorPage.btnVerTablaAmortizacion().scrollIntoViewIfNeeded();
  72  |     await this.simuladorPage.btnVerTablaAmortizacion().click();
  73  |     await this.page.waitForTimeout(4000);
  74  |   }
  75  | 
  76  |   async obtenerCuotaMensualTexto(): Promise<string> {
  77  |     const frame = await this.simuladorPage.getFrame();
  78  |     return await frame.evaluate(() => {
  79  |       const elements = Array.from(document.querySelectorAll('pichincha-typography')) as HTMLElement[];
  80  |       const dollarEls = elements.filter(el => /^\$[1-9][0-9.,]*,[0-9]+$/.test((el.innerText || '').trim()));
  81  |       return dollarEls[3]?.innerText?.trim() || '';
  82  |     });
  83  |   }
  84  | 
  85  |   async obtenerTasaInteres(): Promise<string> {
  86  |     const frame = await this.simuladorPage.getFrame();
  87  |     return await frame.evaluate(() => {
  88  |       const strongs = Array.from(document.querySelectorAll('strong')) as HTMLElement[];
  89  |       const tasa = strongs.find(el => /^[0-9]+,[0-9]+%$/.test((el.innerText || '').trim()));
  90  |       return tasa?.innerText?.trim() || '';
  91  |     });
  92  |   }
  93  | 
  94  |   async obtenerTotalAPagar(): Promise<string> {
  95  |     const frame = await this.simuladorPage.getFrame();
  96  |     await frame.waitForFunction(() =>
  97  |       Array.from(document.querySelectorAll('pichincha-typography'))
  98  |         .some(el => (el as HTMLElement).innerText?.trim() === 'Total a pagar:'),
  99  |       { timeout: 15_000 },
  100 |     );
  101 |     return await frame.evaluate(() => {
  102 |       const elements = Array.from(document.querySelectorAll('pichincha-typography')) as HTMLElement[];
  103 |       const texts = elements.map(el => (el as HTMLElement).innerText?.trim() || '');
  104 |       const idx = texts.findIndex(t => t === 'Total a pagar:');
  105 |       if (idx !== -1 && idx + 1 < texts.length) return texts[idx + 1];
  106 |       const dollarEls = elements.filter(el => /^\$[1-9][0-9.,]*,[0-9]+$/.test((el.innerText || '').trim()));
  107 |       return dollarEls[dollarEls.length - 1]?.innerText?.trim() || '';
  108 |     });
  109 |   }
  110 | 
  111 |   async tablaAmortizacionEsVisible(): Promise<boolean> {
  112 |     const frame = await this.simuladorPage.getFrame();
  113 |     return await frame.evaluate(() =>
  114 |       Array.from(document.querySelectorAll('pichincha-typography'))
  115 |         .some(el => (el as HTMLElement).innerText?.includes('Fecha de pago')),
  116 |     );
  117 |   }
  118 | }
  119 | 
```