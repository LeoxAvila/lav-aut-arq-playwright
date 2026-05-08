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
                - generic [ref=f11e1]:
                  - generic [ref=f11e4]:
                    - generic [ref=f11e5]:
                      - heading "¿Que crédito necesitas?" [level=2] [ref=f11e7]:
                        - generic: ¿Que crédito necesitas?
                      - generic [ref=f11e12]:
                        - paragraph [ref=f11e15]:
                          - generic: HIPOTECARIO VIVIENDA
                        - generic [ref=f11e17] [cursor=pointer]:
                          - generic: arrow_drop_down
                    - paragraph [ref=f11e19]:
                      - generic: Ingresa los siguientes datos para empezar la simulación
                    - generic [ref=f11e20]:
                      - generic [ref=f11e21]:
                        - generic [ref=f11e23]:
                          - paragraph [ref=f11e26]:
                            - generic: ¿Cuánto cuesta la vivienda ?
                          - generic [ref=f11e27]:
                            - paragraph [ref=f11e29]:
                              - generic: $
                            - generic [ref=f11e30]:
                              - textbox "0" [ref=f11e31]: "80.000"
                              - generic [ref=f11e34]:
                                - generic: check_circle
                          - paragraph [ref=f11e38]:
                            - generic: Min. $3.000,00
                        - generic [ref=f11e40]:
                          - paragraph [ref=f11e43]:
                            - generic: ¿Cuánto dinero necesitas que te prestemos?
                          - generic [ref=f11e44]:
                            - paragraph [ref=f11e46]:
                              - generic: $
                            - generic [ref=f11e47]:
                              - textbox "0" [ref=f11e48]: "10.000"
                              - generic [ref=f11e51]:
                                - generic: check_circle
                          - paragraph [ref=f11e55]:
                            - generic: Min. $3.000,00
                        - generic [ref=f11e57]:
                          - paragraph [ref=f11e60]:
                            - generic: ¿En cuanto tiempo quieres pagarlo?
                          - generic [ref=f11e61]:
                            - generic [ref=f11e62]:
                              - paragraph [ref=f11e64]:
                                - generic: Selecciona un plazo
                              - generic [ref=f11e66] [cursor=pointer]:
                                - generic: arrow_drop_down
                            - list [ref=f11e67]:
                              - listitem [ref=f11e68]:
                                - generic "3 años" [ref=f11e69]:
                                  - paragraph [ref=f11e70]:
                                    - generic: 3 años
                              - listitem [ref=f11e71]:
                                - generic "3 años y 1 mes" [ref=f11e72]:
                                  - paragraph [ref=f11e73]:
                                    - generic: 3 años y 1 mes
                              - listitem [ref=f11e74]:
                                - generic "3 años y 2 meses" [ref=f11e75]:
                                  - paragraph [ref=f11e76]:
                                    - generic: 3 años y 2 meses
                              - listitem [ref=f11e77]:
                                - generic "3 años y 3 meses" [ref=f11e78]:
                                  - paragraph [ref=f11e79]:
                                    - generic: 3 años y 3 meses
                              - listitem [ref=f11e80]:
                                - generic "3 años y 4 meses" [ref=f11e81]:
                                  - paragraph [ref=f11e82]:
                                    - generic: 3 años y 4 meses
                              - listitem [ref=f11e83]:
                                - generic "3 años y 5 meses" [ref=f11e84]:
                                  - paragraph [ref=f11e85]:
                                    - generic: 3 años y 5 meses
                              - listitem [ref=f11e86]:
                                - generic "3 años y 6 meses" [ref=f11e87]:
                                  - paragraph [ref=f11e88]:
                                    - generic: 3 años y 6 meses
                              - listitem [ref=f11e89]:
                                - generic "3 años y 7 meses" [ref=f11e90]:
                                  - paragraph [ref=f11e91]:
                                    - generic: 3 años y 7 meses
                              - listitem [ref=f11e92]:
                                - generic "3 años y 8 meses" [ref=f11e93]:
                                  - paragraph [ref=f11e94]:
                                    - generic: 3 años y 8 meses
                              - listitem [ref=f11e95]:
                                - generic "3 años y 9 meses" [ref=f11e96]:
                                  - paragraph [ref=f11e97]:
                                    - generic: 3 años y 9 meses
                              - listitem [ref=f11e98]:
                                - generic "3 años y 10 meses" [ref=f11e99]:
                                  - paragraph [ref=f11e100]:
                                    - generic: 3 años y 10 meses
                              - listitem [ref=f11e101]:
                                - generic "3 años y 11 meses" [ref=f11e102]:
                                  - paragraph [ref=f11e103]:
                                    - generic: 3 años y 11 meses
                              - listitem [ref=f11e104]:
                                - generic "4 años" [ref=f11e105]:
                                  - paragraph [ref=f11e106]:
                                    - generic: 4 años
                              - listitem [ref=f11e107]:
                                - generic "4 años y 1 mes" [ref=f11e108]:
                                  - paragraph [ref=f11e109]:
                                    - generic: 4 años y 1 mes
                              - listitem [ref=f11e110]:
                                - generic "4 años y 2 meses" [ref=f11e111]:
                                  - paragraph [ref=f11e112]:
                                    - generic: 4 años y 2 meses
                              - listitem [ref=f11e113]:
                                - generic "4 años y 3 meses" [ref=f11e114]:
                                  - paragraph [ref=f11e115]:
                                    - generic: 4 años y 3 meses
                              - listitem [ref=f11e116]:
                                - generic "4 años y 4 meses" [ref=f11e117]:
                                  - paragraph [ref=f11e118]:
                                    - generic: 4 años y 4 meses
                              - listitem [ref=f11e119]:
                                - generic "4 años y 5 meses" [ref=f11e120]:
                                  - paragraph [ref=f11e121]:
                                    - generic: 4 años y 5 meses
                              - listitem [ref=f11e122]:
                                - generic "4 años y 6 meses" [ref=f11e123]:
                                  - paragraph [ref=f11e124]:
                                    - generic: 4 años y 6 meses
                              - listitem [ref=f11e125]:
                                - generic "4 años y 7 meses" [ref=f11e126]:
                                  - paragraph [ref=f11e127]:
                                    - generic: 4 años y 7 meses
                              - listitem [ref=f11e128]:
                                - generic "4 años y 8 meses" [ref=f11e129]:
                                  - paragraph [ref=f11e130]:
                                    - generic: 4 años y 8 meses
                              - listitem [ref=f11e131]:
                                - generic "4 años y 9 meses" [ref=f11e132]:
                                  - paragraph [ref=f11e133]:
                                    - generic: 4 años y 9 meses
                              - listitem [ref=f11e134]:
                                - generic "4 años y 10 meses" [ref=f11e135]:
                                  - paragraph [ref=f11e136]:
                                    - generic: 4 años y 10 meses
                              - listitem [ref=f11e137]:
                                - generic "4 años y 11 meses" [ref=f11e138]:
                                  - paragraph [ref=f11e139]:
                                    - generic: 4 años y 11 meses
                              - listitem [ref=f11e140]:
                                - generic "5 años" [ref=f11e141]:
                                  - paragraph [ref=f11e142]:
                                    - generic: 5 años
                              - listitem [ref=f11e143]:
                                - generic "5 años y 1 mes" [ref=f11e144]:
                                  - paragraph [ref=f11e145]:
                                    - generic: 5 años y 1 mes
                              - listitem [ref=f11e146]:
                                - generic "5 años y 2 meses" [ref=f11e147]:
                                  - paragraph [ref=f11e148]:
                                    - generic: 5 años y 2 meses
                              - listitem [ref=f11e149]:
                                - generic "5 años y 3 meses" [ref=f11e150]:
                                  - paragraph [ref=f11e151]:
                                    - generic: 5 años y 3 meses
                              - listitem [ref=f11e152]:
                                - generic "5 años y 4 meses" [ref=f11e153]:
                                  - paragraph [ref=f11e154]:
                                    - generic: 5 años y 4 meses
                              - listitem [ref=f11e155]:
                                - generic "5 años y 5 meses" [ref=f11e156]:
                                  - paragraph [ref=f11e157]:
                                    - generic: 5 años y 5 meses
                              - listitem [ref=f11e158]:
                                - generic "5 años y 6 meses" [ref=f11e159]:
                                  - paragraph [ref=f11e160]:
                                    - generic: 5 años y 6 meses
                              - listitem [ref=f11e161]:
                                - generic "5 años y 7 meses" [ref=f11e162]:
                                  - paragraph [ref=f11e163]:
                                    - generic: 5 años y 7 meses
                              - listitem [ref=f11e164]:
                                - generic "5 años y 8 meses" [ref=f11e165]:
                                  - paragraph [ref=f11e166]:
                                    - generic: 5 años y 8 meses
                              - listitem [ref=f11e167]:
                                - generic "5 años y 9 meses" [ref=f11e168]:
                                  - paragraph [ref=f11e169]:
                                    - generic: 5 años y 9 meses
                              - listitem [ref=f11e170]:
                                - generic "5 años y 10 meses" [ref=f11e171]:
                                  - paragraph [ref=f11e172]:
                                    - generic: 5 años y 10 meses
                              - listitem [ref=f11e173]:
                                - generic "5 años y 11 meses" [ref=f11e174]:
                                  - paragraph [ref=f11e175]:
                                    - generic: 5 años y 11 meses
                              - listitem [ref=f11e176]:
                                - generic "6 años" [ref=f11e177]:
                                  - paragraph [ref=f11e178]:
                                    - generic: 6 años
                              - listitem [ref=f11e179]:
                                - generic "6 años y 1 mes" [ref=f11e180]:
                                  - paragraph [ref=f11e181]:
                                    - generic: 6 años y 1 mes
                              - listitem [ref=f11e182]:
                                - generic "6 años y 2 meses" [ref=f11e183]:
                                  - paragraph [ref=f11e184]:
                                    - generic: 6 años y 2 meses
                              - listitem [ref=f11e185]:
                                - generic "6 años y 3 meses" [ref=f11e186]:
                                  - paragraph [ref=f11e187]:
                                    - generic: 6 años y 3 meses
                              - listitem [ref=f11e188]:
                                - generic "6 años y 4 meses" [ref=f11e189]:
                                  - paragraph [ref=f11e190]:
                                    - generic: 6 años y 4 meses
                              - listitem [ref=f11e191]:
                                - generic "6 años y 5 meses" [ref=f11e192]:
                                  - paragraph [ref=f11e193]:
                                    - generic: 6 años y 5 meses
                              - listitem [ref=f11e194]:
                                - generic "6 años y 6 meses" [ref=f11e195]:
                                  - paragraph [ref=f11e196]:
                                    - generic: 6 años y 6 meses
                              - listitem [ref=f11e197]:
                                - generic "6 años y 7 meses" [ref=f11e198]:
                                  - paragraph [ref=f11e199]:
                                    - generic: 6 años y 7 meses
                              - listitem [ref=f11e200]:
                                - generic "6 años y 8 meses" [ref=f11e201]:
                                  - paragraph [ref=f11e202]:
                                    - generic: 6 años y 8 meses
                              - listitem [ref=f11e203]:
                                - generic "6 años y 9 meses" [ref=f11e204]:
                                  - paragraph [ref=f11e205]:
                                    - generic: 6 años y 9 meses
                              - listitem [ref=f11e206]:
                                - generic "6 años y 10 meses" [ref=f11e207]:
                                  - paragraph [ref=f11e208]:
                                    - generic: 6 años y 10 meses
                              - listitem [ref=f11e209]:
                                - generic "6 años y 11 meses" [ref=f11e210]:
                                  - paragraph [ref=f11e211]:
                                    - generic: 6 años y 11 meses
                              - listitem [ref=f11e212]:
                                - generic "7 años" [ref=f11e213]:
                                  - paragraph [ref=f11e214]:
                                    - generic: 7 años
                              - listitem [ref=f11e215]:
                                - generic "7 años y 1 mes" [ref=f11e216]:
                                  - paragraph [ref=f11e217]:
                                    - generic: 7 años y 1 mes
                              - listitem [ref=f11e218]:
                                - generic "7 años y 2 meses" [ref=f11e219]:
                                  - paragraph [ref=f11e220]:
                                    - generic: 7 años y 2 meses
                              - listitem [ref=f11e221]:
                                - generic "7 años y 3 meses" [ref=f11e222]:
                                  - paragraph [ref=f11e223]:
                                    - generic: 7 años y 3 meses
                              - listitem [ref=f11e224]:
                                - generic "7 años y 4 meses" [ref=f11e225]:
                                  - paragraph [ref=f11e226]:
                                    - generic: 7 años y 4 meses
                              - listitem [ref=f11e227]:
                                - generic "7 años y 5 meses" [ref=f11e228]:
                                  - paragraph [ref=f11e229]:
                                    - generic: 7 años y 5 meses
                              - listitem [ref=f11e230]:
                                - generic "7 años y 6 meses" [ref=f11e231]:
                                  - paragraph [ref=f11e232]:
                                    - generic: 7 años y 6 meses
                              - listitem [ref=f11e233]:
                                - generic "7 años y 7 meses" [ref=f11e234]:
                                  - paragraph [ref=f11e235]:
                                    - generic: 7 años y 7 meses
                              - listitem [ref=f11e236]:
                                - generic "7 años y 8 meses" [ref=f11e237]:
                                  - paragraph [ref=f11e238]:
                                    - generic: 7 años y 8 meses
                              - listitem [ref=f11e239]:
                                - generic "7 años y 9 meses" [ref=f11e240]:
                                  - paragraph [ref=f11e241]:
                                    - generic: 7 años y 9 meses
                              - listitem [ref=f11e242]:
                                - generic "7 años y 10 meses" [ref=f11e243]:
                                  - paragraph [ref=f11e244]:
                                    - generic: 7 años y 10 meses
                              - listitem [ref=f11e245]:
                                - generic "7 años y 11 meses" [ref=f11e246]:
                                  - paragraph [ref=f11e247]:
                                    - generic: 7 años y 11 meses
                              - listitem [ref=f11e248]:
                                - generic "8 años" [ref=f11e249]:
                                  - paragraph [ref=f11e250]:
                                    - generic: 8 años
                              - listitem [ref=f11e251]:
                                - generic "8 años y 1 mes" [ref=f11e252]:
                                  - paragraph [ref=f11e253]:
                                    - generic: 8 años y 1 mes
                              - listitem [ref=f11e254]:
                                - generic "8 años y 2 meses" [ref=f11e255]:
                                  - paragraph [ref=f11e256]:
                                    - generic: 8 años y 2 meses
                              - listitem [ref=f11e257]:
                                - generic "8 años y 3 meses" [ref=f11e258]:
                                  - paragraph [ref=f11e259]:
                                    - generic: 8 años y 3 meses
                              - listitem [ref=f11e260]:
                                - generic "8 años y 4 meses" [ref=f11e261]:
                                  - paragraph [ref=f11e262]:
                                    - generic: 8 años y 4 meses
                              - listitem [ref=f11e263]:
                                - generic "8 años y 5 meses" [ref=f11e264]:
                                  - paragraph [ref=f11e265]:
                                    - generic: 8 años y 5 meses
                              - listitem [ref=f11e266]:
                                - generic "8 años y 6 meses" [ref=f11e267]:
                                  - paragraph [ref=f11e268]:
                                    - generic: 8 años y 6 meses
                              - listitem [ref=f11e269]:
                                - generic "8 años y 7 meses" [ref=f11e270]:
                                  - paragraph [ref=f11e271]:
                                    - generic: 8 años y 7 meses
                              - listitem [ref=f11e272]:
                                - generic "8 años y 8 meses" [ref=f11e273]:
                                  - paragraph [ref=f11e274]:
                                    - generic: 8 años y 8 meses
                              - listitem [ref=f11e275]:
                                - generic "8 años y 9 meses" [ref=f11e276]:
                                  - paragraph [ref=f11e277]:
                                    - generic: 8 años y 9 meses
                              - listitem [ref=f11e278]:
                                - generic "8 años y 10 meses" [ref=f11e279]:
                                  - paragraph [ref=f11e280]:
                                    - generic: 8 años y 10 meses
                              - listitem [ref=f11e281]:
                                - generic "8 años y 11 meses" [ref=f11e282]:
                                  - paragraph [ref=f11e283]:
                                    - generic: 8 años y 11 meses
                              - listitem [ref=f11e284]:
                                - generic "9 años" [ref=f11e285]:
                                  - paragraph [ref=f11e286]:
                                    - generic: 9 años
                              - listitem [ref=f11e287]:
                                - generic "9 años y 1 mes" [ref=f11e288]:
                                  - paragraph [ref=f11e289]:
                                    - generic: 9 años y 1 mes
                              - listitem [ref=f11e290]:
                                - generic "9 años y 2 meses" [ref=f11e291]:
                                  - paragraph [ref=f11e292]:
                                    - generic: 9 años y 2 meses
                              - listitem [ref=f11e293]:
                                - generic "9 años y 3 meses" [ref=f11e294]:
                                  - paragraph [ref=f11e295]:
                                    - generic: 9 años y 3 meses
                              - listitem [ref=f11e296]:
                                - generic "9 años y 4 meses" [ref=f11e297]:
                                  - paragraph [ref=f11e298]:
                                    - generic: 9 años y 4 meses
                              - listitem [ref=f11e299]:
                                - generic "9 años y 5 meses" [ref=f11e300]:
                                  - paragraph [ref=f11e301]:
                                    - generic: 9 años y 5 meses
                              - listitem [ref=f11e302]:
                                - generic "9 años y 6 meses" [ref=f11e303]:
                                  - paragraph [ref=f11e304]:
                                    - generic: 9 años y 6 meses
                              - listitem [ref=f11e305]:
                                - generic "9 años y 7 meses" [ref=f11e306]:
                                  - paragraph [ref=f11e307]:
                                    - generic: 9 años y 7 meses
                              - listitem [ref=f11e308]:
                                - generic "9 años y 8 meses" [ref=f11e309]:
                                  - paragraph [ref=f11e310]:
                                    - generic: 9 años y 8 meses
                              - listitem [ref=f11e311]:
                                - generic "9 años y 9 meses" [ref=f11e312]:
                                  - paragraph [ref=f11e313]:
                                    - generic: 9 años y 9 meses
                              - listitem [ref=f11e314]:
                                - generic "9 años y 10 meses" [ref=f11e315]:
                                  - paragraph [ref=f11e316]:
                                    - generic: 9 años y 10 meses
                              - listitem [ref=f11e317]:
                                - generic "9 años y 11 meses" [ref=f11e318]:
                                  - paragraph [ref=f11e319]:
                                    - generic: 9 años y 11 meses
                              - listitem [ref=f11e320]:
                                - generic "10 años" [ref=f11e321]:
                                  - paragraph [ref=f11e322]:
                                    - generic: 10 años
                              - listitem [ref=f11e323]:
                                - generic "10 años y 1 mes" [ref=f11e324]:
                                  - paragraph [ref=f11e325]:
                                    - generic: 10 años y 1 mes
                              - listitem [ref=f11e326]:
                                - generic "10 años y 2 meses" [ref=f11e327]:
                                  - paragraph [ref=f11e328]:
                                    - generic: 10 años y 2 meses
                              - listitem [ref=f11e329]:
                                - generic "10 años y 3 meses" [ref=f11e330]:
                                  - paragraph [ref=f11e331]:
                                    - generic: 10 años y 3 meses
                              - listitem [ref=f11e332]:
                                - generic "10 años y 4 meses" [ref=f11e333]:
                                  - paragraph [ref=f11e334]:
                                    - generic: 10 años y 4 meses
                              - listitem [ref=f11e335]:
                                - generic "10 años y 5 meses" [ref=f11e336]:
                                  - paragraph [ref=f11e337]:
                                    - generic: 10 años y 5 meses
                              - listitem [ref=f11e338]:
                                - generic "10 años y 6 meses" [ref=f11e339]:
                                  - paragraph [ref=f11e340]:
                                    - generic: 10 años y 6 meses
                              - listitem [ref=f11e341]:
                                - generic "10 años y 7 meses" [ref=f11e342]:
                                  - paragraph [ref=f11e343]:
                                    - generic: 10 años y 7 meses
                              - listitem [ref=f11e344]:
                                - generic "10 años y 8 meses" [ref=f11e345]:
                                  - paragraph [ref=f11e346]:
                                    - generic: 10 años y 8 meses
                              - listitem [ref=f11e347]:
                                - generic "10 años y 9 meses" [ref=f11e348]:
                                  - paragraph [ref=f11e349]:
                                    - generic: 10 años y 9 meses
                              - listitem [ref=f11e350]:
                                - generic "10 años y 10 meses" [ref=f11e351]:
                                  - paragraph [ref=f11e352]:
                                    - generic: 10 años y 10 meses
                              - listitem [ref=f11e353]:
                                - generic "10 años y 11 meses" [ref=f11e354]:
                                  - paragraph [ref=f11e355]:
                                    - generic: 10 años y 11 meses
                              - listitem [ref=f11e356]:
                                - generic "11 años" [ref=f11e357]:
                                  - paragraph [ref=f11e358]:
                                    - generic: 11 años
                              - listitem [ref=f11e359]:
                                - generic "11 años y 1 mes" [ref=f11e360]:
                                  - paragraph [ref=f11e361]:
                                    - generic: 11 años y 1 mes
                              - listitem [ref=f11e362]:
                                - generic "11 años y 2 meses" [ref=f11e363]:
                                  - paragraph [ref=f11e364]:
                                    - generic: 11 años y 2 meses
                              - listitem [ref=f11e365]:
                                - generic "11 años y 3 meses" [ref=f11e366]:
                                  - paragraph [ref=f11e367]:
                                    - generic: 11 años y 3 meses
                              - listitem [ref=f11e368]:
                                - generic "11 años y 4 meses" [ref=f11e369]:
                                  - paragraph [ref=f11e370]:
                                    - generic: 11 años y 4 meses
                              - listitem [ref=f11e371]:
                                - generic "11 años y 5 meses" [ref=f11e372]:
                                  - paragraph [ref=f11e373]:
                                    - generic: 11 años y 5 meses
                              - listitem [ref=f11e374]:
                                - generic "11 años y 6 meses" [ref=f11e375]:
                                  - paragraph [ref=f11e376]:
                                    - generic: 11 años y 6 meses
                              - listitem [ref=f11e377]:
                                - generic "11 años y 7 meses" [ref=f11e378]:
                                  - paragraph [ref=f11e379]:
                                    - generic: 11 años y 7 meses
                              - listitem [ref=f11e380]:
                                - generic "11 años y 8 meses" [ref=f11e381]:
                                  - paragraph [ref=f11e382]:
                                    - generic: 11 años y 8 meses
                              - listitem [ref=f11e383]:
                                - generic "11 años y 9 meses" [ref=f11e384]:
                                  - paragraph [ref=f11e385]:
                                    - generic: 11 años y 9 meses
                              - listitem [ref=f11e386]:
                                - generic "11 años y 10 meses" [ref=f11e387]:
                                  - paragraph [ref=f11e388]:
                                    - generic: 11 años y 10 meses
                              - listitem [ref=f11e389]:
                                - generic "11 años y 11 meses" [ref=f11e390]:
                                  - paragraph [ref=f11e391]:
                                    - generic: 11 años y 11 meses
                              - listitem [ref=f11e392]:
                                - generic "12 años" [ref=f11e393]:
                                  - paragraph [ref=f11e394]:
                                    - generic: 12 años
                              - listitem [ref=f11e395]:
                                - generic "12 años y 1 mes" [ref=f11e396]:
                                  - paragraph [ref=f11e397]:
                                    - generic: 12 años y 1 mes
                              - listitem [ref=f11e398]:
                                - generic "12 años y 2 meses" [ref=f11e399]:
                                  - paragraph [ref=f11e400]:
                                    - generic: 12 años y 2 meses
                              - listitem [ref=f11e401]:
                                - generic "12 años y 3 meses" [ref=f11e402]:
                                  - paragraph [ref=f11e403]:
                                    - generic: 12 años y 3 meses
                              - listitem [ref=f11e404]:
                                - generic "12 años y 4 meses" [ref=f11e405]:
                                  - paragraph [ref=f11e406]:
                                    - generic: 12 años y 4 meses
                              - listitem [ref=f11e407]:
                                - generic "12 años y 5 meses" [ref=f11e408]:
                                  - paragraph [ref=f11e409]:
                                    - generic: 12 años y 5 meses
                              - listitem [ref=f11e410]:
                                - generic "12 años y 6 meses" [ref=f11e411]:
                                  - paragraph [ref=f11e412]:
                                    - generic: 12 años y 6 meses
                              - listitem [ref=f11e413]:
                                - generic "12 años y 7 meses" [ref=f11e414]:
                                  - paragraph [ref=f11e415]:
                                    - generic: 12 años y 7 meses
                              - listitem [ref=f11e416]:
                                - generic "12 años y 8 meses" [ref=f11e417]:
                                  - paragraph [ref=f11e418]:
                                    - generic: 12 años y 8 meses
                              - listitem [ref=f11e419]:
                                - generic "12 años y 9 meses" [ref=f11e420]:
                                  - paragraph [ref=f11e421]:
                                    - generic: 12 años y 9 meses
                              - listitem [ref=f11e422]:
                                - generic "12 años y 10 meses" [ref=f11e423]:
                                  - paragraph [ref=f11e424]:
                                    - generic: 12 años y 10 meses
                              - listitem [ref=f11e425]:
                                - generic "12 años y 11 meses" [ref=f11e426]:
                                  - paragraph [ref=f11e427]:
                                    - generic: 12 años y 11 meses
                              - listitem [ref=f11e428]:
                                - generic "13 años" [ref=f11e429]:
                                  - paragraph [ref=f11e430]:
                                    - generic: 13 años
                              - listitem [ref=f11e431]:
                                - generic "13 años y 1 mes" [ref=f11e432]:
                                  - paragraph [ref=f11e433]:
                                    - generic: 13 años y 1 mes
                              - listitem [ref=f11e434]:
                                - generic "13 años y 2 meses" [ref=f11e435]:
                                  - paragraph [ref=f11e436]:
                                    - generic: 13 años y 2 meses
                              - listitem [ref=f11e437]:
                                - generic "13 años y 3 meses" [ref=f11e438]:
                                  - paragraph [ref=f11e439]:
                                    - generic: 13 años y 3 meses
                              - listitem [ref=f11e440]:
                                - generic "13 años y 4 meses" [ref=f11e441]:
                                  - paragraph [ref=f11e442]:
                                    - generic: 13 años y 4 meses
                              - listitem [ref=f11e443]:
                                - generic "13 años y 5 meses" [ref=f11e444]:
                                  - paragraph [ref=f11e445]:
                                    - generic: 13 años y 5 meses
                              - listitem [ref=f11e446]:
                                - generic "13 años y 6 meses" [ref=f11e447]:
                                  - paragraph [ref=f11e448]:
                                    - generic: 13 años y 6 meses
                              - listitem [ref=f11e449]:
                                - generic "13 años y 7 meses" [ref=f11e450]:
                                  - paragraph [ref=f11e451]:
                                    - generic: 13 años y 7 meses
                              - listitem [ref=f11e452]:
                                - generic "13 años y 8 meses" [ref=f11e453]:
                                  - paragraph [ref=f11e454]:
                                    - generic: 13 años y 8 meses
                              - listitem [ref=f11e455]:
                                - generic "13 años y 9 meses" [ref=f11e456]:
                                  - paragraph [ref=f11e457]:
                                    - generic: 13 años y 9 meses
                              - listitem [ref=f11e458]:
                                - generic "13 años y 10 meses" [ref=f11e459]:
                                  - paragraph [ref=f11e460]:
                                    - generic: 13 años y 10 meses
                              - listitem [ref=f11e461]:
                                - generic "13 años y 11 meses" [ref=f11e462]:
                                  - paragraph [ref=f11e463]:
                                    - generic: 13 años y 11 meses
                              - listitem [ref=f11e464]:
                                - generic "14 años" [ref=f11e465]:
                                  - paragraph [ref=f11e466]:
                                    - generic: 14 años
                              - listitem [ref=f11e467]:
                                - generic "14 años y 1 mes" [ref=f11e468]:
                                  - paragraph [ref=f11e469]:
                                    - generic: 14 años y 1 mes
                              - listitem [ref=f11e470]:
                                - generic "14 años y 2 meses" [ref=f11e471]:
                                  - paragraph [ref=f11e472]:
                                    - generic: 14 años y 2 meses
                              - listitem [ref=f11e473]:
                                - generic "14 años y 3 meses" [ref=f11e474]:
                                  - paragraph [ref=f11e475]:
                                    - generic: 14 años y 3 meses
                              - listitem [ref=f11e476]:
                                - generic "14 años y 4 meses" [ref=f11e477]:
                                  - paragraph [ref=f11e478]:
                                    - generic: 14 años y 4 meses
                              - listitem [ref=f11e479]:
                                - generic "14 años y 5 meses" [ref=f11e480]:
                                  - paragraph [ref=f11e481]:
                                    - generic: 14 años y 5 meses
                              - listitem [ref=f11e482]:
                                - generic "14 años y 6 meses" [ref=f11e483]:
                                  - paragraph [ref=f11e484]:
                                    - generic: 14 años y 6 meses
                              - listitem [ref=f11e485]:
                                - generic "14 años y 7 meses" [ref=f11e486]:
                                  - paragraph [ref=f11e487]:
                                    - generic: 14 años y 7 meses
                              - listitem [ref=f11e488]:
                                - generic "14 años y 8 meses" [ref=f11e489]:
                                  - paragraph [ref=f11e490]:
                                    - generic: 14 años y 8 meses
                              - listitem [ref=f11e491]:
                                - generic "14 años y 9 meses" [ref=f11e492]:
                                  - paragraph [ref=f11e493]:
                                    - generic: 14 años y 9 meses
                              - listitem [ref=f11e494]:
                                - generic "14 años y 10 meses" [ref=f11e495]:
                                  - paragraph [ref=f11e496]:
                                    - generic: 14 años y 10 meses
                              - listitem [ref=f11e497]:
                                - generic "14 años y 11 meses" [ref=f11e498]:
                                  - paragraph [ref=f11e499]:
                                    - generic: 14 años y 11 meses
                              - listitem [ref=f11e500]:
                                - generic "15 años" [ref=f11e501]:
                                  - paragraph [ref=f11e502]:
                                    - generic: 15 años
                              - listitem [ref=f11e503]:
                                - generic "15 años y 1 mes" [ref=f11e504]:
                                  - paragraph [ref=f11e505]:
                                    - generic: 15 años y 1 mes
                              - listitem [ref=f11e506]:
                                - generic "15 años y 2 meses" [ref=f11e507]:
                                  - paragraph [ref=f11e508]:
                                    - generic: 15 años y 2 meses
                              - listitem [ref=f11e509]:
                                - generic "15 años y 3 meses" [ref=f11e510]:
                                  - paragraph [ref=f11e511]:
                                    - generic: 15 años y 3 meses
                              - listitem [ref=f11e512]:
                                - generic "15 años y 4 meses" [ref=f11e513]:
                                  - paragraph [ref=f11e514]:
                                    - generic: 15 años y 4 meses
                              - listitem [ref=f11e515]:
                                - generic "15 años y 5 meses" [ref=f11e516]:
                                  - paragraph [ref=f11e517]:
                                    - generic: 15 años y 5 meses
                              - listitem [ref=f11e518]:
                                - generic "15 años y 6 meses" [ref=f11e519]:
                                  - paragraph [ref=f11e520]:
                                    - generic: 15 años y 6 meses
                              - listitem [ref=f11e521]:
                                - generic "15 años y 7 meses" [ref=f11e522]:
                                  - paragraph [ref=f11e523]:
                                    - generic: 15 años y 7 meses
                              - listitem [ref=f11e524]:
                                - generic "15 años y 8 meses" [ref=f11e525]:
                                  - paragraph [ref=f11e526]:
                                    - generic: 15 años y 8 meses
                              - listitem [ref=f11e527]:
                                - generic "15 años y 9 meses" [ref=f11e528]:
                                  - paragraph [ref=f11e529]:
                                    - generic: 15 años y 9 meses
                              - listitem [ref=f11e530]:
                                - generic "15 años y 10 meses" [ref=f11e531]:
                                  - paragraph [ref=f11e532]:
                                    - generic: 15 años y 10 meses
                              - listitem [ref=f11e533]:
                                - generic "15 años y 11 meses" [ref=f11e534]:
                                  - paragraph [ref=f11e535]:
                                    - generic: 15 años y 11 meses
                              - listitem [ref=f11e536]:
                                - generic "16 años" [ref=f11e537]:
                                  - paragraph [ref=f11e538]:
                                    - generic: 16 años
                              - listitem [ref=f11e539]:
                                - generic "16 años y 1 mes" [ref=f11e540]:
                                  - paragraph [ref=f11e541]:
                                    - generic: 16 años y 1 mes
                              - listitem [ref=f11e542]:
                                - generic "16 años y 2 meses" [ref=f11e543]:
                                  - paragraph [ref=f11e544]:
                                    - generic: 16 años y 2 meses
                              - listitem [ref=f11e545]:
                                - generic "16 años y 3 meses" [ref=f11e546]:
                                  - paragraph [ref=f11e547]:
                                    - generic: 16 años y 3 meses
                              - listitem [ref=f11e548]:
                                - generic "16 años y 4 meses" [ref=f11e549]:
                                  - paragraph [ref=f11e550]:
                                    - generic: 16 años y 4 meses
                              - listitem [ref=f11e551]:
                                - generic "16 años y 5 meses" [ref=f11e552]:
                                  - paragraph [ref=f11e553]:
                                    - generic: 16 años y 5 meses
                              - listitem [ref=f11e554]:
                                - generic "16 años y 6 meses" [ref=f11e555]:
                                  - paragraph [ref=f11e556]:
                                    - generic: 16 años y 6 meses
                              - listitem [ref=f11e557]:
                                - generic "16 años y 7 meses" [ref=f11e558]:
                                  - paragraph [ref=f11e559]:
                                    - generic: 16 años y 7 meses
                              - listitem [ref=f11e560]:
                                - generic "16 años y 8 meses" [ref=f11e561]:
                                  - paragraph [ref=f11e562]:
                                    - generic: 16 años y 8 meses
                              - listitem [ref=f11e563]:
                                - generic "16 años y 9 meses" [ref=f11e564]:
                                  - paragraph [ref=f11e565]:
                                    - generic: 16 años y 9 meses
                              - listitem [ref=f11e566]:
                                - generic "16 años y 10 meses" [ref=f11e567]:
                                  - paragraph [ref=f11e568]:
                                    - generic: 16 años y 10 meses
                              - listitem [ref=f11e569]:
                                - generic "16 años y 11 meses" [ref=f11e570]:
                                  - paragraph [ref=f11e571]:
                                    - generic: 16 años y 11 meses
                              - listitem [ref=f11e572]:
                                - generic "17 años" [ref=f11e573]:
                                  - paragraph [ref=f11e574]:
                                    - generic: 17 años
                              - listitem [ref=f11e575]:
                                - generic "17 años y 1 mes" [ref=f11e576]:
                                  - paragraph [ref=f11e577]:
                                    - generic: 17 años y 1 mes
                              - listitem [ref=f11e578]:
                                - generic "17 años y 2 meses" [ref=f11e579]:
                                  - paragraph [ref=f11e580]:
                                    - generic: 17 años y 2 meses
                              - listitem [ref=f11e581]:
                                - generic "17 años y 3 meses" [ref=f11e582]:
                                  - paragraph [ref=f11e583]:
                                    - generic: 17 años y 3 meses
                              - listitem [ref=f11e584]:
                                - generic "17 años y 4 meses" [ref=f11e585]:
                                  - paragraph [ref=f11e586]:
                                    - generic: 17 años y 4 meses
                              - listitem [ref=f11e587]:
                                - generic "17 años y 5 meses" [ref=f11e588]:
                                  - paragraph [ref=f11e589]:
                                    - generic: 17 años y 5 meses
                              - listitem [ref=f11e590]:
                                - generic "17 años y 6 meses" [ref=f11e591]:
                                  - paragraph [ref=f11e592]:
                                    - generic: 17 años y 6 meses
                              - listitem [ref=f11e593]:
                                - generic "17 años y 7 meses" [ref=f11e594]:
                                  - paragraph [ref=f11e595]:
                                    - generic: 17 años y 7 meses
                              - listitem [ref=f11e596]:
                                - generic "17 años y 8 meses" [ref=f11e597]:
                                  - paragraph [ref=f11e598]:
                                    - generic: 17 años y 8 meses
                              - listitem [ref=f11e599]:
                                - generic "17 años y 9 meses" [ref=f11e600]:
                                  - paragraph [ref=f11e601]:
                                    - generic: 17 años y 9 meses
                              - listitem [ref=f11e602]:
                                - generic "17 años y 10 meses" [ref=f11e603]:
                                  - paragraph [ref=f11e604]:
                                    - generic: 17 años y 10 meses
                              - listitem [ref=f11e605]:
                                - generic "17 años y 11 meses" [ref=f11e606]:
                                  - paragraph [ref=f11e607]:
                                    - generic: 17 años y 11 meses
                              - listitem [ref=f11e608]:
                                - generic "18 años" [ref=f11e609]:
                                  - paragraph [ref=f11e610]:
                                    - generic: 18 años
                              - listitem [ref=f11e611]:
                                - generic "18 años y 1 mes" [ref=f11e612]:
                                  - paragraph [ref=f11e613]:
                                    - generic: 18 años y 1 mes
                              - listitem [ref=f11e614]:
                                - generic "18 años y 2 meses" [ref=f11e615]:
                                  - paragraph [ref=f11e616]:
                                    - generic: 18 años y 2 meses
                              - listitem [ref=f11e617]:
                                - generic "18 años y 3 meses" [ref=f11e618]:
                                  - paragraph [ref=f11e619]:
                                    - generic: 18 años y 3 meses
                              - listitem [ref=f11e620]:
                                - generic "18 años y 4 meses" [ref=f11e621]:
                                  - paragraph [ref=f11e622]:
                                    - generic: 18 años y 4 meses
                              - listitem [ref=f11e623]:
                                - generic "18 años y 5 meses" [ref=f11e624]:
                                  - paragraph [ref=f11e625]:
                                    - generic: 18 años y 5 meses
                              - listitem [ref=f11e626]:
                                - generic "18 años y 6 meses" [ref=f11e627]:
                                  - paragraph [ref=f11e628]:
                                    - generic: 18 años y 6 meses
                              - listitem [ref=f11e629]:
                                - generic "18 años y 7 meses" [ref=f11e630]:
                                  - paragraph [ref=f11e631]:
                                    - generic: 18 años y 7 meses
                              - listitem [ref=f11e632]:
                                - generic "18 años y 8 meses" [ref=f11e633]:
                                  - paragraph [ref=f11e634]:
                                    - generic: 18 años y 8 meses
                              - listitem [ref=f11e635]:
                                - generic "18 años y 9 meses" [ref=f11e636]:
                                  - paragraph [ref=f11e637]:
                                    - generic: 18 años y 9 meses
                              - listitem [ref=f11e638]:
                                - generic "18 años y 10 meses" [ref=f11e639]:
                                  - paragraph [ref=f11e640]:
                                    - generic: 18 años y 10 meses
                              - listitem [ref=f11e641]:
                                - generic "18 años y 11 meses" [ref=f11e642]:
                                  - paragraph [ref=f11e643]:
                                    - generic: 18 años y 11 meses
                              - listitem [ref=f11e644]:
                                - generic "19 años" [ref=f11e645]:
                                  - paragraph [ref=f11e646]:
                                    - generic: 19 años
                              - listitem [ref=f11e647]:
                                - generic "19 años y 1 mes" [ref=f11e648]:
                                  - paragraph [ref=f11e649]:
                                    - generic: 19 años y 1 mes
                              - listitem [ref=f11e650]:
                                - generic "19 años y 2 meses" [ref=f11e651]:
                                  - paragraph [ref=f11e652]:
                                    - generic: 19 años y 2 meses
                              - listitem [ref=f11e653]:
                                - generic "19 años y 3 meses" [ref=f11e654]:
                                  - paragraph [ref=f11e655]:
                                    - generic: 19 años y 3 meses
                              - listitem [ref=f11e656]:
                                - generic "19 años y 4 meses" [ref=f11e657]:
                                  - paragraph [ref=f11e658]:
                                    - generic: 19 años y 4 meses
                              - listitem [ref=f11e659]:
                                - generic "19 años y 5 meses" [ref=f11e660]:
                                  - paragraph [ref=f11e661]:
                                    - generic: 19 años y 5 meses
                              - listitem [ref=f11e662]:
                                - generic "19 años y 6 meses" [ref=f11e663]:
                                  - paragraph [ref=f11e664]:
                                    - generic: 19 años y 6 meses
                              - listitem [ref=f11e665]:
                                - generic "19 años y 7 meses" [ref=f11e666]:
                                  - paragraph [ref=f11e667]:
                                    - generic: 19 años y 7 meses
                              - listitem [ref=f11e668]:
                                - generic "19 años y 8 meses" [ref=f11e669]:
                                  - paragraph [ref=f11e670]:
                                    - generic: 19 años y 8 meses
                              - listitem [ref=f11e671]:
                                - generic "19 años y 9 meses" [ref=f11e672]:
                                  - paragraph [ref=f11e673]:
                                    - generic: 19 años y 9 meses
                              - listitem [ref=f11e674]:
                                - generic "19 años y 10 meses" [ref=f11e675]:
                                  - paragraph [ref=f11e676]:
                                    - generic: 19 años y 10 meses
                              - listitem [ref=f11e677]:
                                - generic "19 años y 11 meses" [ref=f11e678]:
                                  - paragraph [ref=f11e679]:
                                    - generic: 19 años y 11 meses
                              - listitem [ref=f11e680]:
                                - generic "20 años" [ref=f11e681]:
                                  - paragraph [ref=f11e682]:
                                    - generic: 20 años
                        - generic [ref=f11e684]:
                          - paragraph [ref=f11e686]:
                            - generic: ¿Como quieres pagar tus intereses?
                          - generic [ref=f11e687]:
                            - generic [ref=f11e688] [cursor=pointer]:
                              - radio "Método Francés Cuotas se mantienen fijas en el tiempo"
                              - paragraph [ref=f11e690]:
                                - generic: Método Francés
                              - paragraph [ref=f11e692]:
                                - generic: Cuotas se mantienen fijas en el tiempo
                            - generic [ref=f11e693] [cursor=pointer]:
                              - radio "Método Alemán Cuotas variables que decrecen en el tiempo"
                              - paragraph [ref=f11e695]:
                                - generic: Método Alemán
                              - paragraph [ref=f11e697]:
                                - generic: Cuotas variables que decrecen en el tiempo
                        - button "Simular" [disabled] [ref=f11e699]:
                          - generic:
                            - paragraph:
                              - generic: Simular
                      - generic [ref=f11e702]:
                        - generic [ref=f11e703]:
                          - paragraph [ref=f11e705]:
                            - generic: Tus pagos mensuales serán
                          - generic [ref=f11e706]:
                            - generic [ref=f11e707]:
                              - generic [ref=f11e708]:
                                - paragraph [ref=f11e709]:
                                  - generic: $0
                                - paragraph [ref=f11e710]:
                                  - generic: Capital
                              - paragraph [ref=f11e712]:
                                - generic: +
                              - generic [ref=f11e713]:
                                - paragraph [ref=f11e714]:
                                  - generic: $0
                                - paragraph [ref=f11e715]:
                                  - generic: Interés
                              - paragraph [ref=f11e717]:
                                - generic: +
                              - generic [ref=f11e718]:
                                - paragraph [ref=f11e719]:
                                  - generic: $0
                                - paragraph [ref=f11e720]:
                                  - generic: Seguro
                            - paragraph [ref=f11e723]:
                              - generic: $0
                            - generic [ref=f11e724]:
                              - paragraph [ref=f11e726]:
                                - generic:
                                  - text: Durante
                                  - strong [ref=f11e727]: "0"
                              - paragraph [ref=f11e729]:
                                - generic:
                                  - text: Con una tasa de interés referencial
                                  - strong [ref=f11e730]: 0%
                        - generic [ref=f11e731]:
                          - paragraph [ref=f11e733]:
                            - generic: Detalle de tu crédito
                          - generic [ref=f11e734]:
                            - generic [ref=f11e735]:
                              - paragraph [ref=f11e737]:
                                - generic: "Capital:"
                              - paragraph [ref=f11e739]:
                                - generic: $0
                            - generic [ref=f11e740]:
                              - paragraph [ref=f11e742]:
                                - generic: "Total de interés:"
                              - paragraph [ref=f11e744]:
                                - generic: $0
                            - generic [ref=f11e745]:
                              - paragraph [ref=f11e747]:
                                - generic: "Total seguro de desgravamen:"
                              - paragraph [ref=f11e749]:
                                - generic: $0
                          - generic [ref=f11e751]:
                            - paragraph [ref=f11e753]:
                              - generic: "Total a pagar:"
                            - paragraph [ref=f11e755]:
                              - generic: $0
                        - paragraph [ref=f11e757]:
                          - generic: "*Valores referenciales, no son considerados como una oferta formal de préstamo.La oferta definitiva está sujeta al cumplimiento de las condiciones y políticas referentes a capacidad de pago."
                        - generic [ref=f11e758]:
                          - text: Ver tabla de amortización
                          - button "Ver tabla de amortización" [ref=f11e759]:
                            - paragraph [ref=f11e762]:
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
                  - iframe [ref=f11e766]:
                    - generic [ref=f13e6]:
                      - text: protegido por
                      - strong [ref=f13e7]: reCAPTCHA
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